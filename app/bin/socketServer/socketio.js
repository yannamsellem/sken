/*Services requiring*/
	const Socketio 		 		= require('socket.io'),
			  cookieParser 		= require('cookie-parser'),
				socketHandshake = require('socket.io-handshake');

/*Bins requiering*/

	const Session = require( global.paths.bin +'/session');
	const Module 	= require( global.paths.bin + '/module');

/*Variables declaration*/
		var sockets = null;

/*Class declaration*/

	class SocketIoServer {
		constructor() {}

		static init (app, server) {
			sockets = Socketio.listen( server, { log: true }).sockets;

			if (global.config.session && global.config.session.enabled) {
				var handshake = socketHandshake({
					store: Session.getSessionStore(),
					key: global.config.session.key,
					secret:  global.config.session.secret,
					parser: cookieParser()
				});
				sockets.use(handshake);
			}

			sockets.on('connection', (socket) => Module.socketInit(sockets, socket, socket.handshake.session));
			
			return this;
		}

		static get() {
			return sockets;
		}
	}

/*Exports*/
module.exports = SocketIoServer;
