/*Class declaration*/

	function Controller () {
		this.get = {};
		this.post = {};
		this.put = {};
		this['delete'] = {};
		this._name = 'base_controller';
	}
/*Public methods declarations*/

	Controller.prototype._init = _init;
	Controller.prototype._$init = _$init;
	Controller.prototype.isDefined = isDefined;


/*Public static methods declarations*/

	Controller.clone = clone;

/*Exports*/

module.exports = Controller;

/*Methods definitions*/

	function _init(app) {
		this.app = app;
		this._$init(app);
	}

	function _$init(app) {
		/* Need to be overridden */
	}


	Object.defineProperty(Controller.prototype, 'init', {
		get: function () {
			return this._init;
		},
		set: function (fn) {
			this._$init = fn;
		}
	});
	
/*Public methods definitions*/

	function isDefined(parameters) {
		return new Promise(function(resolve, reject) {
			for (var key in parameters) {
				if (parameters[key] === undefined || parameters[key] === null) {
					reject(Error('Missing '+ key + ' parameters'));
				}
			}
			resolve(parameters);
		});
	}

/*Public static methods definitions*/

	function clone () {
		return new Controller();
	}