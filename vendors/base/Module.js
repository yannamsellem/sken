/*Requiring services*/
const CustomFS = require('./utils/fs-utils');
const Path 		 = require('path');
const fs 			 = require('fs');
const _ 			 = require('lodash');

/* Class declaration */
	class Module {
		constructor(currentDir) {
			this.currentDir = currentDir;
			this.controllers = {};
			this._name = '_base';
			this._routing = false;
			this.routing = undefined;
		}

		/*Private methods definitions*/
		_loadControllers() {
			let controllerPath = Path.normalize(this.currentDir + '/controllers');
			if (CustomFS.checkPathSync(controllerPath)) {
				let controllersFiles = CustomFS.getFilesSync(controllerPath);
				for (let i = 0; i < controllersFiles.length; i++) {
					let ctrlPath = Path.join(controllerPath,controllersFiles[i]);
					try {
						let ControllerClass = require(ctrlPath);
						let controller = new ControllerClass();
						this.controllers[controller._name.toLowerCase()] = controller;
					} catch (e) {
						throw Error(`Error loading controller at path ${ctrlPath}: ${e}`);
					}
				}
			}
		}

		_loadRouting() {
			let routingPath = Path.join(this.currentDir,'routing.js');
			if (this._routing) {
				if (CustomFS.checkPathSync(routingPath)) {
					try {
						let RoutingClass = require(routingPath);
						this.routing = new RoutingClass();
					} catch (e) {
						console.log(e);
						throw e;
					}
				} else {
					throw Error(`Routing file not found for the ${this._name} module`);
				}
			}
		}

		init(app) {
			this.app = app;

			this._loadControllers();
			this._loadRouting();

			if (!_.isEmpty(this.controllers)) {
				for (var key in this.controllers) {
					if (this.controllers.hasOwnProperty(key)) {
						this.controllers[key].init(this.app);
					}
				}
			}
			if (this._routing && this.routing !== undefined) {
				this.routing.init(this.app, this.controllers);
			}
		}

		socketInit(sockets, socket, session) {
			if (this._routing && this.routing !== undefined) {
				this.routing.socketInit(sockets, socket, session);
			}
		}

		toString() {
			return `[Module ${this._name}]`;
		}
	}

	/*Exports*/
	module.exports = Module;
