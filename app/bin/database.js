/*Services requiring*/

	var debug = require('debug')('NodeServer:database');

/*Class declarations*/

	var DbLoader = function() {};

/*Variable declarations*/

	var databases = {};

/*Static methods declarations*/

	DbLoader.init = init;
	DbLoader.get = get;

module.exports = DbLoader;

/*Static methods definitions*/

	function init() {
		var promises = [Promise.resolve()],
			currentPath = '';
		for(var i in global.config.databases) {
			currentPath = global.config.databases[i].path;
			try {
				databases[i] = require( currentPath );
				promises.push( databases[i].init() );
				debug(i + ' database initialization');
			}
			catch(exception) {
				debug('unable to load the database '+ i);
			}
		}

		return Promise.all(promises);
	}

	function get(name) {

		var self = this;

		return new Promise(function(resolve, reject) {
			if(name && databases[name.toLowerCase()]) {
				resolve(databases[name.toLowerCase()].get());
			}
			else {
				debug('Database not found for the name: ' + name);
				reject(Error('Database not found for the given name'));
			}
		});
	}
