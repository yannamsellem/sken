/*Service requiring*/
	var MongoClient = require('mongodb').MongoClient,
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
		this._init();
	}

	function _init () {
		var url = 'mongodb://'+ configuration.host + ':' + configuration.port + '/' + configuration.schema.name,
			promise;
		promise = MongoClient.connect(url, {
			db: configuration.schema.options,
			server: {
				autoReconnect: configuration.server_options
			}
		})
		.then(function(_db) {
			db = _db;
			debug('Connected to database "' + configuration.schema.name + '"');
			db.on('error', function(err) {
				debug('An error occured' + err);
			});
			db.on('close', function() {
				db = null;
			});
		})
		.catch(function(err) {
			debug('"' + configuration.schema.name + '" doesnot exists.');
			console.log(err);
		});
	}

	function get () {
		return db;
	}