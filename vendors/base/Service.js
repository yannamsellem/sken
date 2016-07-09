/*Class declaration*/

    class Service {
        constructor() {
            this._name = 'base_service_name';
        }

        /*Public static methods definitions*/
        static clone() {
            return new Service();
        }
    }

/*Exports*/

module.exports = Service;
