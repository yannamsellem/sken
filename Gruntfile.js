var path = require('path');

module.exports = Grunt;

function Grunt (grunt) {

	var config = {};
	config.package = grunt.file.readJSON('package.json');

	try {
		require(__dirname + '/app/constantLoader').init();
		require(__dirname + '/app/configLoader').init();
	} catch (e) {
		global.paths = {};
		global.paths.app = Path.normalize(__dirname + '/app');
		global.paths.server = Path.normalize(__dirname + '/server');
		global.paths.webRoot = Path.normalize(__dirname + '/web');
		global.paths.webSrc = Path.normalize(__dirname + '/web/src');
		global.paths.webDist = Path.normalize(__dirname + '/web/dist');
	}

	require('time-grunt')(grunt);
	require('jit-grunt', grunt, {
		clean:'grunt-contrib-clean',
 		concat:'grunt-contrib-concat',
 		copy:'grunt-contrib-copy',
 		cssmin:'grunt-contrib-cssmin',
 		imagemin:'grunt-contrib-imagemin',
 		sass:'grunt-contrib-sass',
 		uglify:'grunt-contrib-uglify',
 		watch:'grunt-contrib-watch',
 		sprite:'grunt-spritesmith',
 		usemin:'grunt-usemin'
	});

	var HtmlTasks = require(__dirname + '/grunt/htmlTasks')(grunt),
		CssTasks = require(__dirname + '/grunt/cssTasks')(grunt),
		ImageTasks = require(__dirname + '/grunt/imageTasks')(grunt),
		UtilsTasks = require(__dirname + '/grunt/utilsTasks')(grunt),
		WatchTasks = require(__dirname + '/grunt/watchTasks')(grunt);

	config.clean = UtilsTasks.clean;
	config.concat = UtilsTasks.concat;
	config.copy = UtilsTasks.copy;
	config.cssmin = CssTasks.cssmin;
	config.imagemin = ImageTasks.imagemin;
	config.sass = CssTasks.sass;
	config.watch = WatchTasks.watch;
	config.sprite = ImageTasks.strite;
	config.usemin = HtmlTasks.usemin;
	config.useminPrepare = HtmlTasks.useminPrepare;

	grunt.initConfig(config);

	// register task 
	grunt.registerTask('build', ['clean:webDist', 'copy', 'useminPrepare', 'concat', 'cssmin:generated', 'uglify', 'usemin']);
	grunt.registerTask('live', ['watch']);
}