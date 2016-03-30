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
    }

/*Services requiring*/
    var MongoDB  = require('mongodb'),
        ObjectID = MongoDB.ObjectID,
        _        = require('lodash');

/*Services injections*/
    MongoFactory.ObjectID = ObjectID;

/*Private methods declarations*/
    MongoFactory.prototype.init = _init;

/*Public methods declarations*/
    MongoFactory.prototype.prepare = prepare;
    MongoFactory.prototype.extendModel = extendModel;

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

        if (!!options.force) {
            promise = self._db.dropCollection(self._collectionName);
        }

        return promise.then(function () {
            return self._db.createCollection(self._collectionName);
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

/*Public static methods definitions*/

   function clone() {
       return new MongoFactory();
   }

/*Public Methods overridden definitions*/

    function toString() {
        return this._name;
    }
