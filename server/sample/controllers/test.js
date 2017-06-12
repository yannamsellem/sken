const { Controller } = require('sken-server-class')

const Databases = require(`${paths.bin}/database`)

class TestController extends Controller {
  constructor () {
    super()

    this._name = 'Test'

    Databases.get('mongoose').then((db) => {
      this.factories = {
        Model: db.models.User,
      }
    }).catch(console.log)
  }

  init (app) {
    super.init(app)

    this.get.user = (request, response, next) => {
      this.isDefined({
        id: request.params.id,
      })
        .then((parameters) => this.factories.Model.findByPrimary(parameters.id))
        .then(model => response.json(model))
        .catch(next)
    }

    this.post.user = (request, response, next) => {
      this.isDefined({
        name: request.body.name,
      })
        .then(parameters => this.factories.Model.create(parameters))
        .then(model => response.json(model))
        .catch(next)
    }
  }
}

module.exports = TestController
