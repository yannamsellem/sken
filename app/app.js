const http = require('http');
const express = require('express');
const debug = require('debug')('Sken:app');
const { join } = require('path');

let app = express();
let server = http.Server(app);

require(join(__dirname, '/constantLoader')).init();
require(join(__dirname, '/configLoader')).init();
require(join(__dirname, '/appKernel')).init(app, server);

if (!module.parent) {
  server.listen(config.server.port, config.server.address, () => {
    debug('%s application is listening on %s:%d - [%s]', process.env.npm_package_name, this.address().address, this.address().port, process.env.npm_package_author_name);
  });
}

module.exports = { app: app, server: server };
