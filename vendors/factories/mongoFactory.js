/*Class Factory declaration*/
    function MongoFactory() {
        /*Attribute*/
        this._collectionName = '';
        this._name = '';

        /*DB declaration*/
        this._db = null;

        /*CRUD object methods*/
        this.get = {};
        this.update = {};
        this.remove = {};

        /*model*/
        this.model = {};

        /*EventEmitter*/
        EventEmitter.call(this);
        this._listen = false;
    }

/*Services requiring*/
    var MongoDB      = require('mongodb'),
        ObjectID     = MongoDB.ObjectID,
        _            = require('lodash'),
        EventEmitter = require('events').EventEmitter,
        util         = require('util');

/*Inheritance*/
    util.inherits(MongoFactory, EventEmitter);

/*Constants Variables*/
    var ON_INSERT_EVENT_NAME = 'ON_INSERT_EVENT_NAME',
        ON_INIT_EVENT_NAME   = 'ON_INIT_EVENT_NAME',
        ON_CREATE_EVENT_NAME = 'ON_CREATE_EVENT_NAME';

/*Services injections*/
    MongoFactory.prototype.ObjectID = ObjectID;

/*Private methods declarations*/
    MongoFactory.prototype.init = _init;

/*Public methods declarations*/
    MongoFactory.prototype.prepare = prepare;
    MongoFactory.prototype.extendModel = extendModel;
    MongoFactory.prototype.insert = insert;

/*Public static methods declarations*/
    MongoFactory.clone = clone;

/*Public Methods overridden declarations*/
    MongoFactory.prototype.toString = toString;

/*Exports*/
module.exports = MongoFactory;

/*Private methods definitions*/
    function _init(db, options) {
        this._db = db;

        options = options || {};

        var promise = Promise.resolve(),
            self = this;

        if (this._listen) {
            this.emit(ON_INIT_EVENT_NAME, this._name);
        }

        if (!!options.force) {
            promise = self._db.dropCollection(self._collectionName);
        }

        return promise.then(function () {
            return self._db.createCollection(self._collectionName);
        }).then(function (collection) {
            if (self._listen) self.emit(ON_CREATE_EVENT_NAME, collection);
            return collection;
        });
    }

/*Public methods definitions*/

    function prepare() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self._db.collection(self._collectionName, {strict: true}, function (err, collection) {
                if(err) reject(err);
                resolve(collection);
            });
        });
    }

    function extendModel(model) {
        return _.extend(_.clone(this.model), model);
    }

    function insert(model) {
        var self = this;
        return this.prepare().then(function (collection) {
            return collection.insertOne(model);
        }).then(function(result) {
            if (self._listen) self.emit(ON_INSERT_EVENT_NAME, result.insertedId);
            return result;
        });
    }

/*Public static methods definitions*/

   function clone() {
       return new MongoFactory();
   }

/*Public Methods overridden definitions*/

    function toString() {
        return '[MongoFactory ' + this._name + ']';
    }
