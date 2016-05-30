/*Service requiring*/
	var path = require('path'),
		debug = require('debug')('NodeServer:websocket');

/*Class declaration*/
	var WebsocketProvider = function() { };

/*Variable declaration*/

	var SocketServer = null;

/*Methods declaration*/

	WebsocketProvider.init = init;
	WebsocketProvider.get = get;

/*Exports*/

	module.exports = WebsocketProvider;

/*Static methods*/

	function init (app, server) {
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

	function get () {
		return SocketServer.get();
	}