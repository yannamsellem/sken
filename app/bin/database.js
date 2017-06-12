/* Services requiring */

const debug = require('debug')('Sken:database')
const path = require('path')

/* Variable declarations */
var databases = {}

const requireMiddleware = (path, isModule) =>
  isModule ? require(path).Driver : require(path)

/* Class declarations */

class DbLoader {
  static init () {
    var promises = [Promise.resolve()]

    for (var i in global.config.databases) {
      const dbConfig = global.config.databases[i]
      const currentPath = !dbConfig.module
        ? path.join(__dirname, dbConfig.path)
        : dbConfig.path
      try {
        databases[i] = requireMiddleware(currentPath, dbConfig.module)
        promises.push(databases[i].init(dbConfig))
        debug(`${i} database initialization`)
      } catch (exception) {
        debug(`unable to load the database ${i}`)
        promises.push(Promise.reject(exception))
      }
    }

    return Promise.all(promises)
  }

  static get (name) {
    return new Promise((resolve, reject) => {
      if (name && databases[name.toLowerCase()]) {
        resolve(databases[name.toLowerCase()].get())
      } else {
        debug(`Database not found for the name: ${name}`)
        reject(Error('Database not found for the given name'))
      }
    })
  }
}

module.exports = DbLoader
