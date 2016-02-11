/* Requiering stuff */
var expressSession = require('express-session'),
    RedisStore = require('connect-redis')(expressSession),
    // redis = require('redis'),
    // client = redis.createClient(),
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
        resave : false,
        saveUninitialized : false
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