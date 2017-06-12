const { Routing } = require('sken-server-class')

class Route extends Routing {
  constructor () {
    super()
    this._prefix = '/api'
  }

  // init(app, controllers) {
  //   super.init(app, controllers);
  //
  // }

  declare (router) {
    router.get('/users/:id', this.controllers.test.get.user)
    router.post('/users', this.controllers.test.post.user)
  }

  socketInit (sockets, socket, session) {}
}

module.exports = Route
