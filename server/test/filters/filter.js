const Filter = require(paths.vendors).base.filter;

class TestFilter extends Filter {
  constructor () {
    super();
    this._name = 'test';
  }

  test (request, response, next) {
    console.log('Test was here!');
    next();
  }
}

module.exports = TestFilter;
