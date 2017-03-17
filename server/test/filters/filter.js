const { Filter } = require('sken-server-class');

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
