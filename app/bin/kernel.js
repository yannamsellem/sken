/*Bin requiring*/

	const Module    = require(__dirname + '/module'),
				Database  = require(__dirname + '/database'),
				Session   = require(__dirname + '/session'),
				Websocket = require(__dirname + '/websocket'),
				debug 		= require('debug')('NodeServer:kernel');

/*Class declaration*/

	class Kernel {
		constructor() {
			this.app = null;
			this.server = null;
		}
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

	Object.defineProperty(Kernel.prototype, 'appDidFinishLaunching', {
		get: function () {
			return this._appDidFinishLaunching;
		},
		set: function (fn) {
			this._$appDidFinishLaunching = fn;
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

	Kernel.prototype._appWillFinishLaunching = _appWillFinishLaunching;
	Kernel.prototype._$appWillFinishLaunching = function() {return Promise.resolve();};

	Kernel.prototype._appDidFinishLaunching = _appDidFinishLaunching;
	Kernel.prototype._$appDidFinishLaunching = function() {};

	Kernel.prototype._dbDidFinishLoading = _dbDidFinishLoading;
	Kernel.prototype._$dbDidFinishLoading = function () {};

	Kernel.prototype._initializeModules = _initializeModules;

/*Public methods declarations*/

	Kernel.prototype.init = init;

/*Methods definitions*/

	function _appWillFinishLaunching () {
		debug('appWillFinishLaunching');
		return this._$appWillFinishLaunching(this.app, this.server);
	}

	function _appDidFinishLaunching () {
		debug('appDidFinishLaunching');
		return this._$appDidFinishLaunching(this.app, this.server);
	}

	function _dbDidFinishLoading () {
		debug('dbDidFinishLoading');
		return this._$dbDidFinishLoading(this.app, this.server, Database);
	}

	function _initializeModules () {
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
				return self.appDidFinishLaunching();
			})
			.catch(function(error) {
				debug('an error occurred during the kernel database initialization: ' + error.toString());
			});
	}

/*Module exportation*/

module.exports = new Kernel();
