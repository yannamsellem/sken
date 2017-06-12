/* Requiring stuff */
const expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)
// const debug = require('debug')('Sken:Redis');
// const redis = require('redis');
// const client = redis.createClient({host: 'localhost', port: 6379});
const options = global.config.session.storeOptions
const sessionStore = new RedisStore({ host: options.host, port: options.port })

/* Object constructor and methods declaration */

class Session {
  static get session () {
    return expressSession({
      store: sessionStore,
      key: global.config.session.key,
      secret: global.config.session.secret,
      resave: true,
      saveUninitialized: true,
    })
  }

  static get sessionStore () { return sessionStore }
}

module.exports = Session

/* Redis Events */

// client.on('error', function (err) {
//     debug('Redis error occurred: ', err.message);
// });
