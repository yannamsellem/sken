/*Services requiring*/

	var Path = require('path'),
		debug = require('debug')('NodeServer:module');

/*Class declarations*/

	var ModuleLoader = function() {};

/*Variables declarations*/

	var modules = {};

/*Static methods declarations*/

	ModuleLoader.init = init;
	ModuleLoader.socketInit = socketInit;

module.exports = ModuleLoader;

/*Static methods definitions*/

	function init(app) {
		for(var i in global.paths.modules) {
			try {
				var path = Path.normalize(global.paths.modules[i]);
				var m = require(path);
				modules[i] = m;
				m.init(app);
				debug('module ' + i + ' initialized');
			}
			catch(exception) {
				debug('unable to load the module' + i);
			}
		}
	}

	function socketInit(sockets, socket, session) {
		for(var i in modules) {
			modules[i].socketInit(sockets, socket, session);
		}
	}
