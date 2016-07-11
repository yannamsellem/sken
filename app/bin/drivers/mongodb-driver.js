/*Service requiring*/
	const MongoClient  = require('mongodb').MongoClient,
				debug 			 = require('debug')('NodeServer:MongoDB'),
				MongoFactory = require(global.paths.vendors).factories.MongoFactory,
				Driver 			 = require(global.paths.vendors).driver;

/*Object declaration*/
	var configuration = null,
			db = null;

/*Class declaration*/
	class MongoDB extends Driver {

		static init (config = global.config.databases.mongodb) {
			configuration = config;
			return this._init();
		}

		static _init () {
			let url = 'mongodb://'+ configuration.host + ':' + configuration.port + '/' + configuration.schema.name,
				promise;
			promise = MongoClient.connect(url, {
				db: configuration.schema.options,
				server: {
					autoReconnect: configuration.server_options.auto_reconnect
				}
			})
			.then((_db) => {
				db = _db;
				debug('Connected to database "' + configuration.schema.name + '"');

				db.on('error', function(err) {
					debug('An error occurred:' + err);
				});

				/*db.on('close', function() {
					db = null;
				});*/

				let factories = this.getFactoriesDirectories(),
					promises = [Promise.resolve()];

				factories.forEach((file) => {
					try {
						var factory = require(file);
						if (factory instanceof MongoFactory) {
							promises.push(factory.init(_db));
						}
					} catch (e) {
						console.log(e);
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

/*Module exports*/
module.exports = MongoDB;
