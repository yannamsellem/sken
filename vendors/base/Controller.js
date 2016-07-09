/*Class declaration*/
	class Controller {
		constructor() {
			this.get = {};
			this.post = {};
			this.put = {};
			this['delete'] = {};
			this.patch = {};
			this._name = 'base_controller';
		}

		/*Properties definitions*/
		get init() {
			return this._init;
		}
		set init(fn) {
			this._$init = fn;
		}

		/*Private methods definitions*/
		_init(app) {
			this.app = app;
			this._$init(app);
		}
		_$init(app) {/* Need to be overridden */}

		/*Public methods definitions*/
		isDefined(parameters) {
			return new Promise((resolve, reject) => {
				for (let key in parameters) {
					if (parameters[key] === undefined || parameters[key] === null || ( typeof parameters[key] === 'number' && isNaN(parameters[key]))) {
						reject(Error('Missing '+ key + ' parameters'));
					}
				}
				resolve(parameters);
			});
		}

		/*Static methods definitions*/
		static clone () {
			return new Controller();
		}
	}

/*Exports*/
module.exports = Controller;
