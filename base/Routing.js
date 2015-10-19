/*Requiring services*/
	var express = require('express');
	var customFS = require('./fs-utils');
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
	Routing.prototype._$init = _$init;
	Routing.prototype._loadControllers = loadControllers;
	Routing.prototype._loadFilters = loadFilters;

/*Public methods declarations*/
	Routing.prototype.initSocket = initSocket;
	Routing.prototype.declare = declare;

/*Properties definitions*/
	Object.defineProperty(Routing.prototype, 'init', {
		get: function () {
			return this._init;
		},
		set: function (fn) {
			this._$init = fn;
		}
	});

/*Private methods definitions*/
	function _init (app) {
		this.app = app;
		// this._loadControllers();
		// this._loadFilters();
		var self = this;
		Promise.resolve()
			.then(function () {
				return self._loadControllers();
			}).then(function () {
				return self._loadFilters();
			}).then(function() {
				return self._$init(self.app);
			}).then(function() {
				return self.declare(self.router);
			}).then(function () {
				self.app.use(self._prefix, self.router);
			});
	}

	function loadControllers() {
		var controllerPath = Path.normalize(this.currentDir + '/controllers');
		if (CustumFS.checkPathSync(controllerPath)) {
			var controllersFiles = CustomFS.getFilesSync(controllerPath);
			for (var i = 0; i < controllersFiles.length; i++) {
				var ctrlPath = Path.join(controllerPath,controllersFiles[i]);
				try {
					var controller = require(ctrlPath);
					this.controllers[controller._name.toLowerCase()] = controller;
				} catch (e) {
					console.warn('Error loading controller',e, 'at path', ctrlPath);
				}
			}
		}
	}

	function loadFilters() {
		var filterPath = Path.normalize(this.currentDir + '/filters');
		if (CustumFS.checkPathSync(filterPath)) {
			var filtersFiles = CustomFS.getFilesSync(filterPath);
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

	function _$init (app) {
		return Promise.resolve();
	}

	function initSocket (sockets, socket, session) {
		
	}
	
	function declare (router) {
		
	}