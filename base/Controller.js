/*Class declaration*/

	function Controller () {
		this.get = {};
		this.post = {};
		this.put = {};
		this['delete'] = {};
		this._name = '_base';
	}

/*Public static methods declarations*/

	Controller.clone = clone;

/*Exports*/

module.exports = Controller;

/*Public static methods definitions*/

	function clone () {
		return new Controller();
	}