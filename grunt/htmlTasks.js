// usemin
module.exports = HtmlTasks;

function HtmlTasks (grunt) {
	var config = {};
	
	/*USEMIN*/
		config.useminPrepare = {
			html: ['views/**/*.html'],
			options : {
				root: global.paths.webSrc + '/views',
				dest: global.paths.webDist + '/views',
			}
		};

		config.usemin = {
			html: [global.paths.webDist + 'views/**/*.html']
		};

	return config;
}