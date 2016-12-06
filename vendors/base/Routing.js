/* Requiring services */
const express = require('express');
const customFS = require('./utils/fs-utils');
const Path = require('path');

/* Class declaration */
class Routing {
  constructor (dir) {
    this.currentDir = dir;
    this.controllers = {};
    this.filters = {};
    this._prefix = '/';
    this._router = express.Router();
  }

/* Private methods definitions */
  init (app, controllers) {
    this.app = app;
    this.controllers = controllers || {};
    this._loadFilters();
    this.declare(this._router);
    this.app.use(this._prefix, this._router);
  }

  _loadFilters () {
    let filterPath = Path.normalize(this.currentDir + '/filters');
    if (customFS.checkPathSync(filterPath)) {
      let filtersFiles = customFS.getFilesSync(filterPath);
      for (let i = 0; i < filtersFiles.length; i++) {
        let fltrPath = Path.join(filterPath, filtersFiles[i]);
        try {
          let FilterClass = require(fltrPath);
          let filter = new FilterClass();
          this.filters[filter._name.toLowerCase()] = filter;
        } catch (e) {
          throw Error(`Error loading filter at path ${fltrPath}: ${e}`);
        }
      }
    }
  }

/* Public methods definitions */
  socketInit () {}
  declare () {}

  toString () {
    return `[Routing ${Path.basename(this.currentDir)}]`;
  }
}

/* Exports */
module.exports = Routing;
