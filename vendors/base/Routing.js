/*Requiring services*/
	const express = require('express');
	const customFS = require('./utils/fs-utils');
	const Path = require('path');

/*Class declaration*/
	class Routing {
		constructor(dir) {
			this.currentDir = dir;
			this.controllers = {};
			this.filters = {};
			this._prefix = '/';
			this._router = express.Router();
		}
		/*Properties definitions*/
		get init() {
			return this._init;
		}
		set init(fn) {
			this._$init = fn;
		}

		/*Private methods definitions*/
		_init (app, controllers) {
			this.app = app;
			this.controllers = controllers || {};
			this._loadFilters();
			this._$init(this.app);
			this.declare(this._router);
			this.app.use(this._prefix, this._router);
		}

		_$init() {return Promise.resolve();}

		_loadFilters() {
			let filterPath = Path.normalize(this.currentDir + '/filters');
			if (customFS.checkPathSync(filterPath)) {
				let filtersFiles = customFS.getFilesSync(filterPath);
				for (let i = 0; i < filtersFiles.length; i++) {
					let fltrPath = Path.join(filterPath,filtersFiles[i]);
					try {
						var filter = require(fltrPath);
						this.filters[filter._name.toLowerCase()] = filter;
					} catch (e) {
						console.warn('Error loading controller',e , 'at path', fltrPath);
					}
				}
			}
		}
		/*Public methods definitions*/
		initSocket() {}
		declare() {}

		/*Public static methods definitions*/
		static clone (dir) {
			return new Routing(dir);
		}

	}

/*Exports*/
module.exports = Routing;
