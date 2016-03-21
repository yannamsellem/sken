var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    config    = null,
    debug     = require('debug')('NodeServer:Sequelize'),
    db        = {models: {}},
    app       = require(global.paths.app + '/app').app;

var MySQLSequelize = function() {};

MySQLSequelize.prototype.init = init;
MySQLSequelize.prototype._init = _init;
MySQLSequelize.prototype.get = get;

module.exports = new MySQLSequelize;

function init(configuration) {
    config = configuration || global.config.databases.sequelize;
    config.logging = debug;
    return this._init();
}

function _init() {
    var sequelize = new Sequelize(config.name, config.user, config.password, config.options),
        self = this;
    return sequelize.authenticate().then(function () {
        var factories = getFactoriesDirectories();
        factories.forEach(function (file) {
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
        return self;
    });
}

function getFactoriesDirectories() {
    var factories = [];

    var factoriesFolders = fs.readdirSync(global.paths.server).filter(function(file) {
        var pathFile = path.join(global.paths.server, file);
        return (fs.statSync(pathFile).isDirectory()) && (fs.existsSync(path.join(pathFile, 'factories')));
    }).map(function (folder) {
        return path.join(global.paths.server, folder+'/factories');
    });
    factoriesFolders.forEach(function (folder) {
        factories = factories.concat(fs.readdirSync(folder).filter(function (file) {
            var filePath = path.join(folder, file);
            return fs.statSync(filePath).isFile() && (file.indexOf('.') !== 0 ) && (file !== 'index.js');
        }).map(function (f) {
            return path.join(folder, f);
        }));
    });

    return factories;
}

function get() {
    return db;
}