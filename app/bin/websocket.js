/*Service requiring*/
	const path 	= require('path'),
				debug = require('debug')('Sken:websocket');


/*Variable declaration*/
	var SocketServer = null;

/*Class declaration*/
	class WebsocketProvider {
		static init (app, server) {
			if (global.config.websocket && global.config.websocket.path) {
				var wsPath = path.normalize(__dirname + global.config.websocket.path);
				try {
					SocketServer = require(wsPath);
				} catch (ex) {
					throw new Error('SocketServer not found');
				}
				debug(global.config.websocket.name + ' ws server initialization');
				SocketServer.init(app, server);
			}
		}

		static get () {
			return SocketServer.get();
		}
	}

/*Exports*/
	module.exports = WebsocketProvider;
