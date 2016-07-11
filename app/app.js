const http 		= require('http'),
			express = require('express'),
    	debug 	= require('debug')('NodeServer:app');

let app 	 = express(),
		server = http.Server(app);

require(__dirname + '/constantLoader').init();
require(__dirname + '/configLoader').init();
require(__dirname + '/appKernel').init(app, server);

server.listen(global.config.server.port, global.config.server.address, function() {
	debug('Server is listening on %s:%d - [%s]', this.address().address, this.address().port, 'GhostxRipper');
});

module.exports = { app: app, server: server };
