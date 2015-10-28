/*Bin requiring*/
	var Kernel = require( global.paths.bin +'/kernel');

/*Services requiring*/
	var bodyParser = require('body-parser'),
		compress = require('compression'),
		express = require('express'),
		jade = require('jade');

/*Kernel methods overriding*/

	Kernel.appWillFinishLaunching = appWillFinishLaunching;

module.exports = Kernel;

/*Kernel methods definitions*/

	function appWillFinishLaunching(app) {
		app.engine('jade', jade.__express);
		app.set('view engine', 'jade');
		app.set('views', global.paths.views);
		app.use(compress());
		app.use(bodyParser.urlencoded({ extended: true, inflate: true }));
		app.use(bodyParser.json());
		app.use(express.static(global.paths.assets));
	}