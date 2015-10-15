/*Requiring services*/
	var express = require('express');
	var customFS = require('./fs-utils');
	var Path = require('path');

/*Class declaration*/
	function Routing (dir) {
		this.currentDir = dir;
		this.controllers = {};
		this.filter = {};
		this._prefix = '/';
		this._router = express.Router();
	}
/*Private methods declarations*/
	Routing.prototype._init = _init;
	Routing.prototype._$init = _$init;

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
		var self = this;
		Promise.resolve()
			.then(function() {
				return self._$init(app);
			}).then(function() {
				return self.declare(self.router);
			}).then(function () {
				self.app.use(self.router);
			});
	}

	function _$init (app) {
		return Promise.resolve();
	}

	function initSocket (sockets, socket, session) {
		
	}
	
	function declare (router) {
		
	}