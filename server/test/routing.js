const Routing = require(paths.vendors).base.routing;

class Route extends Routing {
  constructor() {
    super();
    this._prefix = '/api';
  }

  // init(app, controllers) {
  //   super.init(app, controllers);
  //
  // }

  declare(router) {
    router.get('/users/:id', this.controllers.test.get.user);
  }

  socketInit(sockets, socket, session) {

  }
}

module.exports = Route;
