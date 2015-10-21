var DATABASE = {};

var OrientDB = require('orientjs');
var coniguration = null;
var db = null;

/* Static methods declaration */

DATABASE.init = init;
DATABASE._init = _init;
DATABASE.get = get;

/* Export */
module.exports = DATABASE;

/*Load config*/
function init(config) {
    configuration = config || global.config.databases.orientdb;
    this._init(configuration.database_options.numberOfRetries, configuration.database_options.retryMilliSeconds);
}

/* private init */
function _init(numberOfRetries, retryMilliSeconds) {
    var self = this,
        promise;
    if(numberOfRetries > 0) {
        if(!db) {
            // Create the conection to the OrientDB server
            var server = OrientDB({
                host: configuration.host,
                port: configuration.port,
                username: configuration.user,
                password: configuration.password
            });

            // Create the connection to the DB
            db = server.use({
                name: configuration.schema.name,
                username: configuration.schema.user,
                password: configuration.schema.password
            });

            db.state = 'disconnected';

            // Error handler
            db.server.transport.connection.handleSocketError = function(err) {
                this.cancel('Connection error');
                
                this.destroySocket();
                db = null;
                setTimeout(function() { DATABASE._init(--numberOfRetries, retryMilliSeconds); }, retryMilliSeconds);
            };

            // try to connect to the DB
            promise = db.record.get('#1:0')
                .then(function() {
                    db.state = 'connected';
                    console.log('OrientDB:', 'Connected to database "' + configuration.schema.name + '"');
                    return self;
                }, function() { console.log('OrientDb database "' + configuration.schema.name + '" doesnot exists.'); });
        } else
            promise = Promise.resolve(self);
    } else
        promise = Promise.reject(Error('Number of retry reached.'));

    return promise;
}

function get () {
    return db;
}