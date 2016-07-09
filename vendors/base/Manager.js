/*Class declaration*/
    class Manager {
        constructor() {
            this.create = {};
            this.update = {};
            this.remove = {};
            this.get    = {};
            this._name = 'base_manager_name';
        }

        static clone() {
            return new Manager();
        }
    }

/*Exports*/
module.exports = Manager;
