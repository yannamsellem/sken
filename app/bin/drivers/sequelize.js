const Sequelize = require('sequelize'),
      debug     = require('debug')('Sken:Sequelize'),
      db        = {models: {}},
    //   app       = require(global.paths.app + '/app').app,
      Driver    = require(paths.vendors).driver;

class SequelizeDriver extends Driver {
    static init(configuration = config.databases.sequelize) {
        configuration.options.logging = configuration.options.logging !== undefined ? configuration.options.logging : debug;
        return this._init(configuration);
    }

    static _init(configuration) {
        let sequelize = new Sequelize(configuration.name, configuration.user, configuration.password, configuration.options);

        return sequelize.authenticate().then(() => {
            let factories = this.getFactoriesDirectories();
            factories.forEach((file) => {
                try {
                    var model = sequelize.import(file);
                    db.models[model.name] = model;
                } catch (e) {
                    // debug('Not a Sequelize factory:', path.basename(file));
                }
            });

            Object.keys(db.models).forEach(function(modelName) {
                if ("associate" in db.models[modelName]) {
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

    static get() {
        return db;
    }
}

module.exports = SequelizeDriver;
