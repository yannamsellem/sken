/*Services requiring*/
	const Path 	= require('path'),
				debug = require('debug')('NodeServer:module');

/*Variables declarations*/
	var modules = {};

/*Class declarations*/
	class ModuleLoader {
		static init(app) {
			for(let i in global.paths.modules) {
				try {
					let path = Path.normalize(global.paths.modules[i] + '/core');
					let m = require(path);
					modules[m._name] = m;
					m.init(app);
					debug('module ' + m._name + ' initialized');
				}
				catch(exception) {
					debug('unable to load the module ' + i);
				}
			}
		}

		/**
		 * initialize the socket part of each modules
		 * @param  {sockets} sockets socket server instance
		 * @param  {socket} socket private socket
		 * @param  {session} session [optional] user session related to the private socket
		 */
		static socketInit(sockets, socket, session) {
			for(var i in modules) {
				modules[i].socketInit(sockets, socket, session);
			}
		}
	}

module.exports = ModuleLoader;

/*Static methods definitions*/
