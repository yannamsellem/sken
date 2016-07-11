const Routing = require(paths.vendors).base.routing;

class Route extends Routing {
  constructor() {
    super();
  }

  init(app, controllers) {
    super.init(app, controllers);

  }

  declare(router) {

  }

  socketInit(sockets, socket, session) {

  }
}

module.exports = Route;
