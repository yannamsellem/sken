/* Requiring stuff */
var expressSession = require('express-session'),
    RedisStore = require('connect-redis')(expressSession),
    debug = require('debug')('NodeServer:Redis'),
    redis = require('redis'),
    client = redis.createClient({host: 'localhost', port: 6379}),
    options = global.config.session.storeOptions,
    sessionStore = new RedisStore({ host: options.host, port: options.port });

/* Object constructor and methods declaration */
var Session = function () { };

Session.getSession = getSession;
Session.getSessionStore = getSessionStore;

module.exports = Session;

/* Static methods definitions */
function getSession() {
    return expressSession({
        store : sessionStore,
        key : global.config.session.key,
        secret: global.config.session.secret,
        resave : true,
        saveUninitialized : true
    });
    /*,
        cookie: {
            expires : new Date(Date.now() + 60480000),
            maxAge : 60480000
        }
    */
}

function getSessionStore() {
    return sessionStore;
}

/* Redis Events */

client.on('error', function (err) {
    debug('Redis error occurred: ', err.message);
});