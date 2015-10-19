/*Services requiring*/

	var path = require('path');

/* Class declaration */

	var ConfigAggregator = function() {};

/* Static methods declaration */

	ConfigAggregator.aggregate = aggregate;

module.exports = ConfigAggregator;

/* Static methods definitions */

	function aggregate (prefix, target) {
		prefix = prefix || 'config';
		target = target || '_';

		var configJson = {},
			configPath = path.normalize(global.paths.app + '/config/' + prefix + '.json');

		try {
			configJson = require(configPath);
		} catch (exception) {
			throw Error('server configuration not found');
		}

		global[target] = configJson;
	}