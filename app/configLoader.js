/* Services requiring */
const { join } = require('path');
const ConfigAggregator = require(join(__dirname, '/bin/utils/configAggregator'));

/* Class declaration */
class ConfigLoader {
  static init () {
    ConfigAggregator.aggregate('config', 'config');
  }
}

module.exports = ConfigLoader;
