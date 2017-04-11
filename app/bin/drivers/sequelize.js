const Sequelize = require('sequelize');
const debug = require('debug')('Sken:Sequelize');
// const { basename } = require('path');

const db = {models: {}};
const Driver = require('sken-config-middleware').Driver;

class SequelizeDriver extends Driver {
  static init (configuration = config.databases.sequelize) {
    configuration.options.logging = configuration.options.logging !== undefined ? configuration.options.logging : debug;
    return this._init(configuration);
  }

  static _init (configuration) {
    const sequelize = new Sequelize(configuration.name, configuration.user, configuration.password, configuration.options);

    return sequelize.authenticate().then(() => {
      const factories = this.getFactoriesDirectories();
      factories.forEach((file) => {
        try {
          const model = sequelize.import(file);
          db.models[model.name] = model;
        } catch (e) {
          // debug('Not a Sequelize factory:', basename(file));
        }
      });

      Object.keys(db.models).forEach(function (modelName) {
        if ('associate' in db.models[modelName]) {
          db.models[modelName].associate(db.models);
        }
      });

      db.sequelize = sequelize;
      db.Sequelize = Sequelize;
    }).then(function () {
      sequelize.sync();
      // app.set('models', db.models);
      // global.models = db.models;
      return this;
    });
  }

  static get () {
    return db;
  }
}

module.exports = SequelizeDriver;
