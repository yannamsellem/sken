/* Service requiring */
const OrientDB = require('orientjs')
const debug = require('debug')('Sken:OrientDB')

/* Object declaration */
var DATABASE = {}
var configuration = null
var db = null

/* Static methods declaration */
DATABASE.init = init
DATABASE._init = _init
DATABASE.get = get

/* Export */
module.exports = DATABASE

/* Load config */
function init (config) {
  configuration = config || global.config.databases.orientdb
  this._init(
    configuration.database_options.numberOfRetries,
    configuration.database_options.retryMilliSeconds
  )
}

/* private init */
function _init (numberOfRetries, retryMilliSeconds) {
  const self = this
  let promise
  if (numberOfRetries > 0) {
    if (!db) {
      // Create the connection to the OrientDB server
      var server = OrientDB({
        host: configuration.host,
        port: configuration.port,
        username: configuration.user,
        password: configuration.password,
      })

      // Create the connection to the DB
      db = server.use({
        name: configuration.schema.name,
        username: configuration.schema.user,
        password: configuration.schema.password,
      })

      db.state = 'disconnected'

      db.server.transport.connection.handleSocketError = function (err) {
        if (err) {
        }
        this.cancel('Connection error')

        this.destroySocket()
        db = null
        setTimeout(function () {
          DATABASE._init(--numberOfRetries, retryMilliSeconds)
        }, retryMilliSeconds)
      }

      // try to connect to the DB
      promise = db.record.get('#1:0').then(
        function () {
          db.state = 'connected'
          debug(`Connected to database "${configuration.schema.name}"`)
          return self
        },
        function () {
          debug(`"${configuration.schema.name}" doesnot exists.`)
        }
      )
    } else {
      promise = Promise.resolve(self)
    }
  } else {
    promise = Promise.reject(Error('Number of retry reached.'))
  }

  return promise
}

function get () {
  return db
}
