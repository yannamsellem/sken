/* Service requiring */
const MySql = require('mysql');
const debug = require('debug')('Sken:MySql');

/* Class declaration */
var configuration = null;
var db = null;
var database = {};

/* Methods declarations */
database._init = _init;
database.init = init;
database.get = get;

module.exports = database;

/* Methods definitions */

function init (config) {
  configuration = config || global.config.databases.mysql;
  return this._init(configuration.database_options.numberOfRetries, configuration.database_options.retryMilliSeconds);
}

function _init (numberOfRetries, retryMilliSeconds) {
  let self = this;
  let promise;
  if (numberOfRetries > 0) {
    if (!db) {
      db = MySql.createConnection({
        host: configuration.host,
        port: configuration.port,
        database: configuration.schema.name,
        user: configuration.schema.user,
        password: configuration.schema.password
      });
      db.on('error', function (err) {
        debug(`An error occurred:\n${err}`);
        if (err.code === 'ECONNREFUSED') {
          db = null;
          setTimeout(function () { database._init(--numberOfRetries, retryMilliSeconds); }, retryMilliSeconds);
        }
      });

      // Wrote queries with parameter db.query("UPDATE posts SET title = :title", { title: "Hello!" });
      db.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/:(\w+)/g, function (txt, key) {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        }.bind(this));
      };

      db.connect();
    }
    promise = Promise.resolve(self);
  } else {
    promise = Promise.reject(Error('Number of retry reached.'));
  }

  return promise;
}

function get () {
  return db;
}
