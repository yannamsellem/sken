const Module = require(paths.vendors).base.module;

class TestModule extends Module {
  constructor() {
    super(__dirname);

    this._name = 'Test';
    this._routing = true;
  }

  init(app) {
    super.init(app);
    // collections.Test.insertMany([{name: 'yann'}, {name: 'yolo'}]).then(console.log).catch(console.log);
  }
}

module.exports = TestModule;
