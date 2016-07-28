/*Bin requiring*/

	const Module    = require(__dirname + '/module'),
				Database  = require(__dirname + '/database'),
				Session   = require(__dirname + '/session'),
				Websocket = require(__dirname + '/websocket'),
				debug 		= require('debug')('Sken:kernel');

/*Class declaration*/

	class Kernel {
		constructor() {
			this.app = null;
			this.server = null;
		}

		/*Properties declarations*/
		get appWillFinishLaunching() {
			return this._appWillFinishLaunching;
		}
		set appWillFinishLaunching(fn) {
			this._$appWillFinishLaunching = fn;
		}

		get appDidFinishLaunching() {
			return this._appDidFinishLaunching;
		}
		set appDidFinishLaunching(fn) {
			this._$appDidFinishLaunching = fn;
		}

		get dbDidFinishLoading() {
			return this._dbDidFinishLoading;
		}
		set dbDidFinishLoading(fn) {
			this._$dbDidFinishLoading = fn;
		}

		/*Private methods definitions*/
		_$appWillFinishLaunching() { return Promise.resolve(); }
		_$appDidFinishLaunching() {}
		_$dbDidFinishLoading() {}

		_appWillFinishLaunching () {
			debug('appWillFinishLaunching');
			return this._$appWillFinishLaunching(this.app, this.server);
		}
		_appDidFinishLaunching () {
			debug('appDidFinishLaunching');
			return this._$appDidFinishLaunching(this.app, this.server);
		}
		_dbDidFinishLoading () {
			debug('dbDidFinishLoading');
			return this._$dbDidFinishLoading(this.app, this.server, Database);
		}
		_initializeModules () {
			Module.init(this.app);
			if(global.config.websocket && global.config.websocket.enabled) {
				Websocket.init(this.app, this.server);
			}
		}

		/*Methods definitions*/

			init (app, server) {
				this.app = app;
				this.server = server;

				Promise.resolve()
					.then(() => this.appWillFinishLaunching())
					.then(() => {
						if(global.config.session && global.config.session.enabled) {
							Session.init().setSession(this.app);
						}

						var dbPromise = Database.init()
							.catch((error) => {
								debug('an error occurred during the kernel database initialization: ' + error.toString());
							});

						dbPromise.then(() =>  this._initializeModules());

						return dbPromise;
					})
					.then(() => this.dbDidFinishLoading())
					.then(() => this.appDidFinishLaunching())
					.catch((error) => {
						debug('an error occurred during the kernel initialization: ' + error.toString());
					});
			}
	}

/*Module exportation*/

module.exports = new Kernel();
