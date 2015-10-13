/*Services requiring*/
	var ConfigAggregator = require('./bin/utils/configAggregator');

/*Class declaration*/
	var ConfigLoader = function ConfigLoader () {};

/*Static method declaration*/
	ConfigLoader.init = init;

module.exports = ConfigLoader;

/*Static method definition*/
	function init() {
		ConfigAggregator.aggregate('config', 'config');
	}