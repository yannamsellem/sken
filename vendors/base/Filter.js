/* Class declaration */

	class Filter {
		constructor() {
			this._name = 'base_filter';
		}
		
		static clone() {
			return new Filter();
		}
	}

/*Exports*/
module.exports = Filter;
