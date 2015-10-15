/*Services requiring*/
	var Socketio = require('socket.io'),
		cookieParser = require('cookie-parser'),
		socketHandshake = require('socket.io-handshake');
	
/*Bins requiering*/

	var Session = require( global.paths.bin +'/session');
	var Module = require( global.paths.bin + '/module');

/*Class declaration*/
	
	var SocketIoServer = function() {};

/*Variables declaration*/

	var sockets = null;

/*Methods declarations*/

	SocketIoServer.init = init;
	SocketIoServer.get = get;

/*Exports*/

	module.exports = SocketIoServer;

/*Implementations*/

	function init (app, server) {
		sockets = Socketio.listen( server, { log: true });

		if (global.config.session && global.config.session.enabled) {
			var handshake = socketHandshake({
				store: Session.getSessionStore(), 
				key: global.config.session.key, 
				secret:  global.config.session.secret, 
				parser: cookieParser()
			});
			sockets.use(handshake);
		}

		sockets.on('connection', function(socket) {
			Module.initSockets(sockets, socket, socket.handshake.session);
		});

		return this;
	}

	function get () {
		return sockets;
	}