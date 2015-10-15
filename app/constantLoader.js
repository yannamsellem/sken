/*Service requiring*/

	var CustomFS = require('../base/utils/fs-utils'),
		Path = require('path');

/*Class declaration*/

	function ConstantLoader() {}

/*Static methods declarations*/

	ConstantLoader.init = init;

module.exports = ConstantLoader;

/*Static methods definitions*/

	function init() {
		global.paths = {};
		global.paths.modules = {};
		global.paths.app = __dirname;
		global.paths.root = Path.normalize(global.paths.app + '/..');
		global.paths.bin = Path.normalize(global.paths.app + '/bin');
		global.paths.server = Path.normalize(global.paths.root + '/server' );
		global.paths.web = Path.normalize(global.paths.root + '/web/' + (process.env.NODE_ENV === 'prod' ? 'dist' : 'src') );
		global.paths.webSrc = Path.normalize(global.paths.root + '/web/src');
		global.paths.webDist = Path.normalize(global.paths.root + '/web/dist');
		global.paths.webRoot = Path.normalize(global.paths.root + '/web');
		global.paths.views = Path.normalize(global.paths.web + '/views');
		global.paths.assets = Path.normalize(global.paths.web + '/assets');

		var modules = CustomFS.getDirectoriesSync(global.paths.server);
		for(var i in modules)
			global.paths.modules[i] = Path.normalize(modules[i]);
	}