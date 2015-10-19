/* Class declaration */

	function Filter () {
		this._name = 'base_filter';
	}

/*Public static methods declarations*/

	Filter.clone = clone;

/*Exports*/

module.exports = Filter;

/*Public static methods definitions*/

	function clone () {
		return new Filter();
	}