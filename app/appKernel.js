/* Bin requiring */
const Kernel = require(`${paths.bin}/kernel`)

/* Services requiring */
const bodyParser = require('body-parser')
const compress = require('compression')
const express = require('express')
const pug = require('pug')
const morgan = require('morgan')
const { ErrorHandler, CrossDomain } = require('sken-config-middleware')

/* Kernel methods overriding */

Kernel.appWillFinishLaunching = app => {
  app.disable('x-powered-by')
  app.engine('pug', pug.__express)
  app.set('view engine', 'pug')
  app.set('views', global.paths.views)
  app.use(compress())
  app.use(bodyParser.urlencoded({ extended: true, inflate: true }))
  app.use(bodyParser.json())
  app.use(express.static(global.paths.assets))
  app.use(CrossDomain.get())
  app.use(morgan('dev'))
}

Kernel.appDidFinishLaunching = app => {
  app.use((req, res, next) => {
    req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    next()
  })
  ErrorHandler.set(app)
}

module.exports = Kernel
