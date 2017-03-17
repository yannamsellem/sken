/* Service requiring */
const path = require('path');
const fs = require('fs');

const getDirectoriesSync = (srcPath) =>
  fs.readdirSync(srcPath).filter((file) =>
  fs.statSync(path.join(srcPath, file)).isDirectory());

/* Class declaration */

class ConstantLoader {
  static init () {
    global.paths = {};
    global.paths.modules = {};
    global.paths.app = __dirname;
    global.paths.root = path.normalize(`${global.paths.app}/..`);
    global.paths.bin = path.normalize(`${global.paths.app}/bin`);
    global.paths.server = path.normalize(`${global.paths.root}/server`);
    global.paths.web = path.normalize(`${global.paths.root}/web/${process.env.NODE_ENV === 'prod' ? 'dist' : 'src'}`);
    global.paths.webSrc = path.normalize(`${global.paths.root}/web/src`);
    global.paths.webDist = path.normalize(`${global.paths.root}/web/dist`);
    global.paths.webRoot = path.normalize(`${global.paths.root}/web`);
    global.paths.views = path.normalize(`${global.paths.web}/views`);
    global.paths.assets = path.normalize(`${global.paths.web}/assets`);

    var modules = getDirectoriesSync(global.paths.server);
    for (let i in modules) {
      global.paths.modules[modules[i]] = path.join(global.paths.server, modules[i]);
    }
  }
}

module.exports = ConstantLoader;
