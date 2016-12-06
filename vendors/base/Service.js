/* Class declaration */
class Service {
  constructor () {
    this._name = 'base_service_name';
  }

  toString () {
    return `[Service ${this._name}]`;
  }
}

/* Exports */
module.exports = Service;
