/*Bin requiring*/
	var Kernel = require( global.paths.bin +'/kernel');

/*Services requiring*/
	var bodyParser = require('body-parser'),
		compress = require('compression'),
		express = require('express');

/*Kernel methods overriding*/

	Kernel.beforeAll = beforeAll;

module.exports = Kernel;

/*Kernel methods definitions*/

	function beforeAll(app) {
		app.set('views', global.paths.views);
		app.use(compress());
		app.use(bodyParser.urlencoded({ extended: true, inflate: true }));
		app.use(bodyParser.json());
		app.use(express.static(global.paths.assets));
	}