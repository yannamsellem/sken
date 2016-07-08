/*Service requiring*/
	var path = require('path'),
		debug = require('debug')('NodeServer:session');

/*Class declaration*/
	var SessionProvider = function () {};

/*Static Variable*/

	var Session = null;

/* Static methods declarations*/

	SessionProvider.init = init;
	SessionProvider.setSession = setSession;
	SessionProvider.getSession = getSession;
	SessionProvider.getSessionStore = getSessionStore;

/*Exports*/

module.exports = SessionProvider;

/*Static methods definitions*/

	function init() {
		if(global.config.session && global.config.session.path) {
			Session = require(path.normalize(__dirname + global.config.session.path));
			debug('Session initialized');
		}
		else {
			throw Error('session path not found int the current config');
		}
		return this;
	}

	function setSession(app) {
		if(Session) {
			app.use(Session.session);
			debug('Session set');
		}
		else {
			throw Error('setSession used before session initialization');
		}
	}

	function getSession() {
		if(Session)
			return Session.session;
		else {
			throw Error('getSession used before session initialization');
		}
	}

	function getSessionStore() {
		if(Session)
			return Session.sessionStore;
		else {
			throw Error('getSessionStore used before session initialization');
		}
	}
