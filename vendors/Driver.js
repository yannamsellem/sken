
const fs = require('fs');
const path = require('path');

class Driver {

  static getFactoriesDirectories() {
		let factories = [];

		let factoriesFolders = fs.readdirSync(global.paths.server).filter((file) => {
			let pathFile = path.join(global.paths.server, file);
			return (fs.statSync(pathFile).isDirectory()) && (fs.existsSync(path.join(pathFile, 'factories')));
		}).map((folder) => path.join(global.paths.server, folder+'/factories'));

		factoriesFolders.forEach((folder) => {
			factories = factories.concat(fs.readdirSync(folder).filter((file) => {
				let filePath = path.join(folder, file);
				return fs.statSync(filePath).isFile() && (file.indexOf('.') !== 0 ) && (file !== 'index.js');
			}).map((f) => path.join(folder, f)) );
		});

		return factories;
	}

}

module.exports = Driver;
