# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Node server module
* 0.1.1
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* just clone the project
* configuration are in app/configs/config.json file
* package.json
* chose your own database and create a driver
* Test not implement yet
* npm install | npm start

### Contribution guidelines ###

* i will write the tests
* i review my code every day

### Who do I talk to? ###

* Just me
* yann_ams@icloud.com

#### Arborescence
NodeServer

|____.gitignore

|____app

| |____.DS_Store

| |____app.js

| |____appKernel.js

| |____bin

| | |____database.js

| | |____drivers

| | | |____sample.txt

| | |____kernel.js

| | |____module.js

| | |____session.js

| | |____sessionProvider

| | | |____redis.js

| | |____socketServer

| | | |____socketio.js

| | |____utils

| | | |____configAggregator.js

| | |____websocket.js

| |____config

| | |____config.json

| |____configLoader.js

| |____constantLoader.js

|____base

| |____Controller.js

| |____Filter.js

| |____index.js

| |____Module.js

| |____Routing.js

| |____utils

| | |____fs-utils.js

|____grunt

|____NodeNodules.txt

|____package.json

|____server

|____web

| |____dist

| |____src

| | |____assets

| | | |____images

| | | |____javascript

| | | | |____libraries

| | | | |____modules

| | | | |____spec

| | | |____styles

| | |____views