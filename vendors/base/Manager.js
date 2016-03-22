/*Class declaration*/

    function Manager() {
        this.create = {};
        this.update = {};
        this.remove = {};
        this.get    = {};

        this._name = 'base_manager_name';
    }

/*Public static methods declarations*/

    Manager.clone = clone;

/*Exports*/

module.exports = Manager;

/*Public static methods definitions*/

    function clone() {
        return new Manager();
    }