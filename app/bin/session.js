/* Service requiring */
const path = require('path');
const debug = require('debug')('Sken:session');

/* Static Variable */
var Session = null;

/* Class declaration */
class SessionProvider {
  static init () {
    if (global.config.session && global.config.session.path) {
      Session = require(path.join(__dirname, global.config.session.path));
      debug('Session initialized');
    } else {
      throw Error('session path not found int the current config');
    }
    return this;
  }

  static setSession (app) {
    if (Session) {
      app.use(Session.session);
      debug('Session set');
    } else {
      throw Error('setSession used before session initialization');
    }
  }

  static getSession () {
    if (Session) {
      return Session.session;
    } else {
      throw Error('getSession used before session initialization');
    }
  }

  static getSessionStore () {
    if (Session) {
      return Session.sessionStore;
    } else {
      throw Error('getSessionStore used before session initialization');
    }
  }
}
/* Exports */

module.exports = SessionProvider;
