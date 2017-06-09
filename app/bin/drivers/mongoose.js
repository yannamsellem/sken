const mongoose = require('mongoose');
const debug = require('debug')('Sken:Mongoose');
const Driver = require('sken-config-middleware').Driver;
mongoose.Promise = global.Promise;

class MongooseDriver extends Driver {
  static init (configuration = config.databases.mongoose) {
    configuration.options.logging = configuration.options.logging !== undefined ? configuration.options.logging : debug;
    return this._init(configuration);
  }

  static _init (configuration) {
    const { host, port, name, options } = configuration;
    return mongoose.connect(`mongodb://${host}:${port}/${name}`, options)
      .then(() => {
        debug(`Connected to database "${name}"`);
        const factories = this.getFactoriesDirectories();
        factories.forEach(file => require(file));
      });
  }
}

module.exports = MongooseDriver;
