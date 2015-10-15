/*Requiring services*/
	var CustumFS = require('./utils/fs-utils');
	var Path = require('path');
	var fs = require('fs');

/* Class declaration */
	function Module (currentDir) {
		this.currentDir = currentDir;
		this.controllers = {};
		this._name = '_base';
		this._routing = true;
	}

/*Private methods declarations*/
	Module.prototype._loadControllers = loadControllers;
	Module.prototype._loadRouting = loadRouting;

/*Public methods declarations*/
	Module.prototype._init = _init;
	Module.prototype._$init = _$init;
	Module.prototype._socketInit = _socketInit;
	Module.prototype._$socketInit = _$socketInit;

/*Public static methods declarations*/
	Module.clone = clone;

/*Private methods definitions*/
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

	function loadRouting() {
		var routingPath = Path.join(this.currentDir,'routing.js');
		if (this._routing && CustumFS.checkPathSync(routingPath)) {
			try {
				this.routing = require(routingPath);
			} catch (e) {
				console.log(e);
			}
		}
	}

	function _init (app) {
		this.app = app;
		this._loadControllers();
		this._loadRouting();
		this._$init(this.app);
		if (this._routing && this.routing !== undefined) {
			this.routing.init(this.app);
		}
	}

	function _$init (app) {
		/*Need To be Overriden*/
	}

	function _socketInit (sockets, socket, session) {
		this._$socketInit(sockets, socket, session);
		if (this._routing && this.routing !== undefined) {
			this.routing.initSocket(sockets, socket, session);
		}
	}

	function _$socketInit (sockets, socket, session) {
		/*Need To be Overriden*/
	}

/* properties definitions */
	Object.defineProperty(Module.prototype, 'init', {
		get: function () {
			return this._init;
		},
		set: function (fn) {
			this._$init = fn;
		}
	});

	Object.defineProperty(Module.prototype, 'socketInit', {
		get: function () {
			return this._socketInit;
		},
		set: function (fn) {
			this._$socketInit = fn;
		}
	});

/*Public static methods definitions*/
	function clone (dir) {
		return new Module(dir);
	}

/*Exports*/
module.exports = Module;