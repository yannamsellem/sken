module.exports = WatchTasks;

function WatchTasks (grunt) {
	var config = {};
	/*WATCH*/
		config.watch = {
			css: {
				files: [{
					expand: true,
					cwd: global.paths.webSrc,
					src: ['**/*.scss'],
					dest: global.paths.webSrc
				}],
				tasks: ['sass']
			}
		};
	
	return config;
}