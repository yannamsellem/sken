const Module = require(paths.vendors).base.module;

class TestModule extends Module {
  constructor () {
    super(__dirname);

    this._name = 'Test';
    this._routing = true;
  }

  init (app) {
    super.init(app);
  }
}

module.exports = TestModule;
