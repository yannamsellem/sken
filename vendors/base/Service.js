/*Class declaration*/

    function Service() {
        this._name = 'base_service_name';
    }

/*Public static methods declarations*/

    Service.clone = clone;

/*Exports*/

module.exports = Service;

/*Public static methods definitions*/

    function clone() {
        return new Service();
    }