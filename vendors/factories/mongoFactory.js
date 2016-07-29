/*Services requiring*/
    const MongoDB      = require('mongodb'),
          ObjectID     = MongoDB.ObjectID,
          _            = require('lodash'),
          EventEmitter = require('events').EventEmitter,
          util         = require('util');

/*Constants Variables*/
    const ON_INSERT_EVENT_NAME = 'ON_INSERT_EVENT_NAME',
          ON_INIT_EVENT_NAME   = 'ON_INIT_EVENT_NAME',
          ON_CREATE_EVENT_NAME = 'ON_CREATE_EVENT_NAME';

/*Class Factory declaration*/
    class MongoFactory extends EventEmitter {
      constructor() {
         /*EventEmitter*/
         super();
         this._listen = false;

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
         this.primaryKey = '_id';
      }

      /*Services injections*/
      get ObjectID() {
         return ObjectID;
      }

      /*Private methods definitions*/
      init(db, options) {
         this._db = db;

         options = options || {};

         var promise = Promise.resolve();

         if (this._listen) {
             this.emit(ON_INIT_EVENT_NAME, this._name);
         }

         if (!!options.force) {
             promise = this._db.dropCollection(this._collectionName);
         }

         return promise.then(() => this._db.createCollection(this._collectionName))
             .then((collection) => {
                 if (this._listen) this.emit(ON_CREATE_EVENT_NAME, collection);
                 return collection;
             });
      }
      /*Public methods definitions*/
      prepare() {
         return new Promise((resolve, reject) => {
             this._db.collection(this._collectionName, {strict: true}, (err, collection) => {
                 if(err) reject(err);
                 resolve(collection);
             });
         });
      }

      extendModel(model) {
          if (this.model.hasOwnProperty(this.primaryKey)) {
              model[this.primaryKey] = this.ObjectID();
          }
          return _.extend(_.clone(this.model), model);
      }

      insertOne(model) {
         return this.prepare().then((collection) => collection.insertOne(this.extendModel(model)))
             .then((result) => {
                 if (this._listen) this.emit(ON_INSERT_EVENT_NAME, result.insertedId);
                 return result;
             });
      }

      insertMany(models) {
          if (models instanceof Array) {
              models = models.map( model => this.extendModel(model) );
              return this.prepare().then((collection) => collection.insertMany(models))
                  .then((result) => {
                      if (this._listen) this.emit(ON_INSERT_EVENT_NAME, result.insertedId);
                      return result;
                  });
          } else {
              return Promise.reject(ReferenceError('Parameter must be an array'));
          }

      }

      /*Public Methods overridden definitions*/
      toString() {
          return `[MongoFactory ${this._name}]`;
      }

    }

/*Exports*/
module.exports = MongoFactory;
