const MongoFactory = require(paths.vendors).factories.MongoFactory;

class TestCollection extends MongoFactory {
  constructor() {
    super();

    this._name = 'Test';
    this._collectionName = 'test';
    this._listen = true;
  }

  init(db, options) {

    this.model._id = '';
    this.model.name = '';

    // TODO: Must return super!!!!
    return super.init(db, options);
  }
}

module.exports = TestCollection;
