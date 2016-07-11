const Sequelize = require('sequelize'),
      debug     = require('debug')('NodeServer:Sequelize'),
      db        = {models: {}},
      app       = require(global.paths.app + '/app').app,
      Driver    = require(global.paths.vendors).driver;

var config = null;

class SequelizeDriver extends Driver {
    static init(configuration) {
        config = configuration || global.config.databases.sequelize;
        config.logging = debug;
        return this._init();
    }

    static _init() {
        let sequelize = new Sequelize(config.name, config.user, config.password, config.options);

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
            app.set('models', db.models);
            return this;
        });
    }

    static get() {
        return db;
    }
}

module.exports = SequelizeDriver;
