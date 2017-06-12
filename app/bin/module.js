/* Services requiring */
const Path = require('path')
const debug = require('debug')('Sken:module')

/* Variables declarations */
var modules = {}

/* Class declarations */
class ModuleLoader {
  static init (app) {
    for (const i in global.paths.modules) {
      try {
        const path = Path.normalize(`${global.paths.modules[i]}/core`)
        const M = require(path)
        const module = new M()
        modules[module._name] = module
        module.init(app)
        debug(`module ${module._name} initialized`)
      } catch (exception) {
        debug(`unable to load the module ${i}: ${exception.message}`)
      }
    }
  }

  /**
* initialize the socket part of each modules
* @param  {sockets} sockets socket server instance
* @param  {socket} socket private socket
* @param  {session} session [optional] user session related to the private socket
*/
  static socketInit (sockets, socket, session) {
    for (var i in modules) {
      modules[i].socketInit(sockets, socket, session)
    }
  }
}

module.exports = ModuleLoader
