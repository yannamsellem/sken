/* Services requiring */
const { Server } = require('ws')

/* Bins requiering */

const Module = require(`${global.paths.bin}/module`)

/* Variables declaration */
var sockets = null

/* Class declaration */

class WebSocketServer {
  static init (app, server) {
    sockets = new Server({server: server, path: config.websocket.client_path})

    sockets.broadcast = (data) => sockets.clients.forEach((client) => client.send(data))

    sockets.on('connection', (socket) => Module.socketInit(sockets, socket))
    return this
  }

  static get () {
    return sockets
  }
}

/* Exports */
module.exports = WebSocketServer
