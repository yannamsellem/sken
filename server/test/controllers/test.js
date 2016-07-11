const Controller = require(paths.vendors).base.controller;

class TestController extends Controller {
  constructor() {
    super();

    this._name = 'Test';
  }

  init(app) {
    super.init(app);

    this.get.user = ((request, response, next) => {
      this.isDefined({
        id: request.params.id
      }).then( (parameters) => response.json(parameters) );
    }).bind(this);
  }
}

module.exports = TestController;
