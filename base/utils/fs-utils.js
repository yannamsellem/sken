/* Import node module */
	var path = require('path');
	var fs = require('fs');

/* Class declaration */

	function CustomFS () {}

/* Module exportation */

	module.exports = CustomFS;

/* Static method declartion */

	CustomFS.getDirectoriesSync = function(scrPath) {
		return fs.readdirSync(scrPath).filter(function(file) {
			return fs.statSync(path.join(scrPath, file)).isDirectory();
		});
	};

	CustomFS.checkPathSync = function(path) {
		try {
			var stat = fs.lstatSync(path);
			if (stat !== undefined) {
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
	};