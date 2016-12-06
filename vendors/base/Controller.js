/* Class declaration */
class Controller {
  constructor () {
    this.get = {};
    this.post = {};
    this.put = {};
    this['delete'] = {};
    this.patch = {};
    this._name = 'base_controller';
  }

/* Private methods definitions */
  init (app) {
    this.app = app;
  }

/* Public methods definitions */
  isDefined (parameters) {
    return new Promise((resolve, reject) => {
      for (let key in parameters) {
        if (parameters[key] === undefined || parameters[key] === null || (typeof parameters[key] === 'number' && isNaN(parameters[key]))) {
          reject(Error(`Missing ${key} parameters`));
        }
      }
      resolve(parameters);
    });
  }

  toString () {
    return `[Controller ${this._name}]`;
  }
}

/* Exports */
module.exports = Controller;
