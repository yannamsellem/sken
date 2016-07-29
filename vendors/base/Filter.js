/* Class declaration */

	class Filter {
		constructor() {
			this._name = 'base_filter';
		}

		toString() {
			return `[Filter ${this._name}]`;
		}
	}

/*Exports*/
module.exports = Filter;
