// sass & cssin
module.exports = CssTasks;

function CssTasks (grunt) {
	var config = {};
	/*CSSMIN*/
		config.cssmin = {
			all: {
			    files: [{
			    	expand: true,
			    	cwd: global.paths.webSrc + '/assets/styles',
			    	src: ['*.css', '!*.min.css', '!librabries/**/*'],
			    	dest: global.paths.webDist + '/assets/styles',
			    	ext: '.min.css'
			    }]
			}
		};
	/*SASS*/
		config.sass = {
			app : {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: global.paths.webSrc + '/assets/styles/',
					src: ['core.scss'],
					dest: global.paths.webSrc + '/assets/styles/',
					ext: '.css'
				}]
			}
		};

	return config;
}