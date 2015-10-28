/*Service requiring*/
	var MongoClient = require('mongodb').MongoClient,
		Db = require('mongodb').Db,
		Server = require('mongodb').Server;
		debug = require('debug')('NodeServer:MongoDB');

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
		this._init(configuration.schema.options.numberOfRetries, configuration.schema.options.retryMilliSeconds);
	}

	function _init (numberOfRetries, retryMilliSeconds) {
		var self = this,
			promise,
			database = new Db(configuration.schema.name, new Server(configuration.host, configuration.port), {
			numberOfRetries: numberOfRetries,
			retryMilliSeconds: retryMilliSeconds,
			auto_reconnect:configuration.server_options.auto_reconnect
		});

		return database.open().then(function(_db) {
			db = _db;

			return _db.authenticate(configuration.schema.user, configuration.schema.password);
		}).then(function () {
			debug('Connected to database "' + configuration.schema.name + '"');
		})
		.catch(function (err) {
			debug('"' + configuration.schema.name + '" doesnot exists.');
		});
	}

	function get () {
		return db;
	}