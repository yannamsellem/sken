/*Service requiring*/
	var MongoClient = require('mongodb').MongoClient,
		debug = require('debug')('NodeServer:MongoDB'),
		fs = require('fs'),
		path = require('path');

/*Object declaration*/
	var configuration = null,
	db = null;

/*Class declaration*/
	var MongoDB = {};

/*Static public methods declarations*/
	MongoDB.init = init;
	MongoDB._init = _init;
	MongoDB.get = get;

/*Module exports*/
module.exports = MongoDB;

/*Static public methods définitions*/
	function init (config) {
		configuration = config || global.config.databases.mongodb;
		return this._init();
	}

	function _init () {
		var url = 'mongodb://'+ configuration.host + ':' + configuration.port + '/' + configuration.schema.name,
			promise;
		promise = MongoClient.connect(url, {
			db: configuration.schema.options,
			server: {
				autoReconnect: configuration.server_options.auto_reconnect
			}
		})
		.then(function(_db) {
			db = _db;
			debug('Connected to database "' + configuration.schema.name + '"');
			db.on('error', function(err) {
				debug('An error occurred:' + err);
			});
			/*db.on('close', function() {
				db = null;
			});*/

			var factories = getFactoriesDirectories(),
				promises = [Promise.resolve()];

			factories.forEach(function (file) {
				try {
					var factory = require(file);
					if (factory.constructor.name === 'MongoFactory') {
						promises.push(factory.init(_db));
					}
				} catch (e) {
					console.log(e);
				}
			});

			return Promise.all(promises);
		})
		.catch(function(err) {
			debug('"' + configuration.schema.name + '" does not exists.');
			debug(err.message);
			// return Promise.reject(err);
		});
		return promise;
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

	function get () {
		return db;
	}