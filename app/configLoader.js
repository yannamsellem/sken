/*Services requiring*/
	var ConfigAggregator = require(__dirname + '/bin/utils/configAggregator');

/*Class declaration*/
	class ConfigLoader {
		static init() {
			ConfigAggregator.aggregate('config', 'config');
		}
	}

module.exports = ConfigLoader;
