/* Requiring stuff */
const expressSession = require('express-session'),
      RedisStore     = require('connect-redis')(expressSession),
      debug          = require('debug')('NodeServer:Redis'),
      redis          = require('redis'),
    //   client         = redis.createClient({host: 'localhost', port: 6379}),
      options        = global.config.session.storeOptions,
      sessionStore   = new RedisStore({ host: options.host, port: options.port });

/* Object constructor and methods declaration */

    class Session {
        constructor() {}
        static get session() {
            return expressSession({
                store : sessionStore,
                key : global.config.session.key,
                secret: global.config.session.secret,
                resave : true,
                saveUninitialized : true
            });
        }

        static get sessionStore() { return sessionStore; }
    }

module.exports = Session;

/* Redis Events */

// client.on('error', function (err) {
//     debug('Redis error occurred: ', err.message);
// });
