/*Services requiring*/

	const debug = require('debug')('NodeServer:database');
	const path  = require('path');

/*Variable declarations*/
		var databases = {};

/*Class declarations*/

	class DbLoader {
		static init() {
			var promises = [Promise.resolve()];

			for(var i in global.config.databases) {
				var currentPath = path.join(__dirname, global.config.databases[i].path);
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

		static get(name) {
			return new Promise((resolve, reject) => {
				if(name && databases[name.toLowerCase()]) {
					resolve(databases[name.toLowerCase()].get());
				}
				else {
					debug('Database not found for the name: ' + name);
					reject(Error('Database not found for the given name'));
				}
			});
		}
	}

module.exports = DbLoader;
