/* Import node module */
	const path = require('path');
	const fs 	 = require('fs');

/* Class declaration */

	class CustomFS {
		static getDirectoriesSync(srcPath) {
			return fs.readdirSync(srcPath).filter((file) => {
				return fs.statSync(path.join(srcPath, file)).isDirectory();
			});
		}

		static checkPathSync(path) {
			try {
				let stat = fs.statSync(path);
				if (stat !== undefined) {
					return true;
				}
			} catch (e) {}
			return false;
		}

		static getFilesSync(srcPath) {
			return fs.readdirSync(srcPath).filter((file) => {
				return fs.statSync(path.join(srcPath, file)).isFile();
			});
		}
	}

/* Module exportation */
	module.exports = CustomFS;
