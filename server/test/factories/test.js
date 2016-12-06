const MongoFactory = require(paths.vendors).factories.MongoFactory;

class TestCollection extends MongoFactory {
  constructor () {
    super();

    this._name = 'Test';
    this._collectionName = 'test';
    this._listen = true;

    // Model
    this.model._id = '';
    this.model.name = '';
  }
}

module.exports = TestCollection;
