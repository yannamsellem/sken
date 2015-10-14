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
		this._loadControllers();
	}

/*Private methods declarations*/
	Module.prototype._loadControllers = loadControllers;
	Module.prototype._loadRouting = loadRouting;

/*Public methods declarations*/
	Module.prototype.init = init;
	Module.prototype.socketInit = socketInit;

/*Private methods definitions*/
	function loadControllers() {
		var controllerPath = Path.normalize(this.currentDir + '/controllers');
		if (CustumFS.checkPathSync(controllerPath)) {
			var controllersFiles = CustomFS.getFilesSync(controllerPath);
			for (var i = 0; i < controllersFiles.length; i++) {
				var ctrlPath = Path.normalize(controllerPath+controllersFiles[i]);
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

	}

/*Public methods definitions*/

	function init (app) {
		this.app = app;
	}

	function socketInit (sockets, socket, session) {
		
	}