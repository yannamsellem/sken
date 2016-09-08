const http 		= require('http'),
			express = require('express'),
    	debug 	= require('debug')('Sken:app');

let app 	 = express(),
		server = http.Server(app);

require(__dirname + '/constantLoader').init();
require(__dirname + '/configLoader').init();
require(__dirname + '/appKernel').init(app, server);

if (!module.parent) {
	server.listen(config.server.port, config.server.address, function() {
		debug('%s application is listening on %s:%d - [%s]',
			process.env.npm_package_name,
			this.address().address,
			this.address().port,
			process.env.npm_package_author_name);
	});
}

module.exports = { app: app, server: server };
