/*Requiring services*/
	var express = require('express');
	var customFS = require('./utils/fs-utils');
	var Path = require('path');

/*Class declaration*/
	function Routing (dir) {
		this.currentDir = dir;
		this.controllers = {};
		this.filters = {};
		this._prefix = '/';
		this._router = express.Router();
	}
/*Private methods declarations*/
	Routing.prototype._init = _init;
	Routing.prototype._$init = function() {return Promise.resolve();};
	// Routing.prototype._loadControllers = loadControllers;
	Routing.prototype._loadFilters = loadFilters;

/*Public methods declarations*/
	Routing.prototype.initSocket = function() {};
	Routing.prototype.declare = function () {};

/*Public static methods declarations*/
	Routing.clone = clone;

/*Properties definitions*/
	Object.defineProperty(Routing.prototype, 'init', {
		get: function () {
			return this._init;
		},
		set: function (fn) {
			this._$init = fn;
		}
	});

/*Exports*/
module.exports = Routing;

/*Private methods definitions*/
	function _init (app, controllers) {
		this.app = app;
		var self = this;
		this.controllers = controllers || {};
		self._loadFilters();
		self._$init(self.app);
		self.declare(self._router);
		self.app.use(self._prefix, self._router);
	}

	function loadFilters() {
		var filterPath = Path.normalize(this.currentDir + '/filters');
		if (customFS.checkPathSync(filterPath)) {
			var filtersFiles = customFS.getFilesSync(filterPath);
			for (var i = 0; i < filtersFiles.length; i++) {
				var fltrPath = Path.join(filterPath,filtersFiles[i]);
				try {
					var filter = require(fltrPath);
					this.filters[filter._name.toLowerCase()] = filter;
				} catch (e) {
					console.warn('Error loading controller',e , 'at path', fltrPath);
				}
			}
		}
	}

/*Public static methods definitions*/
	function clone (dir) {
		return new Routing(dir);
	}