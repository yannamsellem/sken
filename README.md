# README

#### This application is programmed in ECMAScript2015

## SKEN - Starter Kit for Express and Node.js

A simple way to make a http (or https) node js app

## What is this repository for?

- Node http server
- Express Starter Kit
- 2.0.0

## How do I get set up?

- Just clone the project
- Configurations are in app/configs/config.json file
- Choose your own database
  use a driver (MySQL, OrientBD, MSSQL, PostgreSQL, MariaDB, SQLite and MongoDB)
  or create one (with init and get functions)
- Test not implement yet
- Implement your modules
- Start the server with `yarn start`
- Enjoy !

#### Hot reloading?

Use `yarn run devserver` for hot reloading

#### You already have your project setup?
Update SKEN using `sh update.sh`

## Contribution guidelines

<!-- - implement Karma for angular unit testing -->
- implement Jasmine for node.js unit testing
- implement Bunyan for logging stuff

##### TODO:

  - [x] Server bin
  - [x] Server entry point (app.js, appKerner.js)
  - [x] Write vendors classes
  - [x] Utils classes
  - [x] Write databases driver parent class ES6
    - [x] MongoDB
    - [x] Sequelize
    - [ ] MySQL
    - [ ] OrientBD
  - [ ] Import and export (ES6 versions)
  - [ ] Unit testing
  - [ ] improve Grunt implementation (broken)
  - [x] update module: create a script to update SKEN

## Who do I talk to?

- Just me
- [GhostxRipper](mailto:yann_ams@icloud.com)
