// usemin
module.exports = HtmlTasks;

function HtmlTasks (grunt) {
  var config = {};

/* USEMIN */
  config.useminPrepare = {
    html: ['views/**/*.html'],
    options: {
      root: global.paths.webSrc + '/views',
      dest: global.paths.webDist + '/views'
    }
  };

  config.usemin = {
    html: [global.paths.webDist + 'views/**/*.html']
  };

/* JADE USEMIN */
  config.jadeUsemin = {
    dist: {
      options: {
        prefix: 'web/src/assets',
        targetPrefix: 'web/dist/assets',
        uglify: {
          mangle: true,
          compress: true
        },
        cssmin: {
          report: 'gzip',
          keepSpecialComments: 0
        },
        tasks: {
          js: ['concat', 'uglify'],
          css: ['concat', 'cssmin']
        }
      },
      files: [{
        expand: true,
        cwd: global.paths.webSrc + '/views',
        src: ['**/*.jade', '!**/partials/angular/**/*.jade'],
        ext: '.jade',
        dest: global.paths.webDist + '/views'
      }]
    }
  };
  return config;
}
