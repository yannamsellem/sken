/* Services requiring */

const { normalize } = require('path')

/* Class declaration */

class ConfigAggregator {
  static aggregate (prefix = 'config', target = '_') {
    let configJson = {}
    const configPath = normalize(`${global.paths.app}/configs/${prefix}.json`)

    try {
      configJson = require(configPath)
    } catch (exception) {
      throw Error('server configuration not found')
    }

    global[target] = configJson
  }
}

module.exports = ConfigAggregator
