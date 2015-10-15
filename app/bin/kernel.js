/*Bin requiring*/

	var Module = require(__dirname + '/module'),
		Database = require(__dirname + '/database'),
		Session = require(__dirname + '/session'),
		Websocket = require(__dirname + '/websocket'),
		debug = require('debug')('NodeServer:kernel');

/*Class declaration*/

	function Kernel () {
		this.app = null;
		this.server = null;
	}

/*Properties declarations*/

	Object.defineProperty(Kernel.prototype, 'appWillFinishLaunching', {
		get: function () {
			return this._appWillFinishLaunching;
		},
		set: function (fn) {
			this._$appWillFinishLaunching = fn;
		}
	});

	Object.defineProperty(Kernel.prototype, 'appDidFinishToLaunching', {
		get: function () {
			return this._appDidFinishLaunching;
		},
		set: function (fn) {
			this._$appDidFinishToLaunching = fn;
		}
	});

	Object.defineProperty(Kernel.prototype, 'dbDidFinishLoading', {
		get: function () {
			return this._dbDidFinishLoading;
		},
		set: function (fn) {
			this._$dbDidFinishLoading = fn;
		}
	});

/*Private methods declarations*/

	Kernel.prototype._appWillFinishLaunching = appWillFinishLaunching;
	Kernel.prototype._$appWillFinishLaunching = function() {return Promise.resolve();};

	Kernel.prototype._appDidFinishLaunching = appDidFinishLaunching;
	Kernel.prototype._$appDidFinishLaunching = function() {};

	Kernel.prototype._dbDidFinishLoading = dbDidFinishLoading;
	Kernel.prototype._$dbDidFinishLoading = function () {};

	Kernel.prototype._initializeModules = initializeModules;

/*Public methods declarations*/

	Kernel.prototype.init = init;

/*Methods definitions*/

	function appWillFinishLaunching () {
		debug('appWillFinishLaunching');
		return this._$appWillFinishLaunching(this.app, this.server);
	}

	function appDidFinishLaunching () {
		debug('appDidFinishLaunching');
		return this._$appDidFinishLaunching(this.app, this.server);
	}

	function dbDidFinishLoading () {
		debug('dbDidFinishLoading');
		return this._$dbDidFinishLoading(this.app, this.server, Database);
	}

	function initializeModules () {
		Module.init(this.app);
		if(global.config.websocket && global.config.websocket.enabled) {
			Websocket.init(this.app, this.server);
		}
	}

	function init (app, server) {
		this.app = app;
		this.server = server;

		var self = this;

		Promise.resolve()
			.then(function() {
				return self.appWillFinishLaunching();
			})
			.then(function() {
				if(global.config.session && global.config.session.enabled) {
					Session.init().setSession(self.app);
				}

				var dbPromise = Database.init()
					.catch(function(error) {
						debug('an error occurred during the kernel database initialization: ' + error.toString());
					});
				dbPromise.then(function() { return self._initializeModules(); });
				return dbPromise;
			})
			.then(function() {
				return self.dbDidFinishLoading();
			})
			.then(function() {
				return self.appDidFinishToLaunching();
			})
			.catch(function(error) {
				debug('an error occurred during the kernel database initialization: ' + error.toString());
			});
	}

/*Module exportation*/

module.exports = new Kernel();