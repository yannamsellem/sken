/* Service requiring */
const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')('Sken:MongoDB');
const MongoFactory = require(global.paths.vendors).factories.MongoFactory;
const Driver = require(global.paths.vendors).driver;

/* Object declaration */
let configuration = null;
let db = null;

/* Class declaration */
class MongoDB extends Driver {

  static init (config = global.config.databases.mongodb) {
    configuration = config;
    return this._init();
  }

  static _init () {
    let url = 'mongodb://' + configuration.host + ':' + configuration.port + '/' + configuration.schema.name;

    let promise = MongoClient.connect(url, {
      db: configuration.schema.options,
      server: {
        autoReconnect: configuration.server_options.auto_reconnect
      }
    })
    .then((_db) => {
      db = _db;
      debug('Connected to database "' + configuration.schema.name + '"');

      db.on('error', (err) => {
        debug('An error occurred:' + err);
      });

      /* db.on('close', () => {
        db = null;
      }); */

      let factories = this.getFactoriesDirectories();
      let promises = [Promise.resolve()];

      db.collections = {};

      factories.forEach((file) => {
        try {
          let FactoryClass = require(file);
          if (Object.getPrototypeOf(FactoryClass) === MongoFactory) {
            let factory = new FactoryClass();
            promises.push(factory.init(_db));
            db.collections[factory._name] = factory;
          }
        } catch (e) {
          debug(e);
        }
      });

      return Promise.all(promises).catch((err) => debug('MongoFactory error - [%s]', err.message));
    })
  .catch((err) => {
    debug('"' + configuration.schema.name + '" does not exists.');
    debug(err.message);
    return Promise.reject(err);
  });

    return promise;
  }

  static get () {
    return db;
  }
}

/* Module exports */
module.exports = MongoDB;
