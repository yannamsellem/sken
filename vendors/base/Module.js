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

		/* properties definitions */
		get init() {
			return this._init;
		}

		set init(fn) {
			this._$init = fn;
		}

		get socketInit() {
			return this._socketInit;
		}

		set socketInit(fn) {
			this._$socketInit = fn;
		}

		/*Private methods definitions*/
		_loadControllers() {
			let controllerPath = Path.normalize(this.currentDir + '/controllers');
			if (CustomFS.checkPathSync(controllerPath)) {
				let controllersFiles = CustomFS.getFilesSync(controllerPath);
				for (let i = 0; i < controllersFiles.length; i++) {
					let ctrlPath = Path.join(controllerPath,controllersFiles[i]);
					try {
						var controller = require(ctrlPath);
						this.controllers[controller._name.toLowerCase()] = controller;
					} catch (e) {
						console.warn('Error loading controller',e, 'at path', ctrlPath);
					}
				}
			}
		}

		_loadRouting() {
			let routingPath = Path.join(this.currentDir,'routing.js');
			if (this._routing && CustomFS.checkPathSync(routingPath)) {
				try {
					this.routing = require(routingPath);
				} catch (e) {
					console.log(e);
				}
			}
		}

		_init (app) {
			this.app = app;

			this._loadControllers();
			this._loadRouting();
			this._$init(this.app);
			if (!_.isEmpty(this.controllers)) {
				_(this.controllers).map((value) => {
					value.init(this.app);
				});
			}
			if (this._routing && this.routing !== undefined) {
				this.routing.init(this.app, self.controllers);
			}
		}

		_$init (app) {/*Need To be overridden*/}

		_socketInit (sockets, socket, session) {
			this._$socketInit(sockets, socket, session);
			if (this._routing && this.routing !== undefined) {
				this.routing.initSocket(sockets, socket, session);
			}
		}
		_$socketInit (sockets, socket, session) {/*Need To be overridden*/}

		/*Public static methods definitions*/
		static clone (dir) {
			return new Module(dir);
		}
	}

	/*Exports*/
	module.exports = Module;
