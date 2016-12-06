module.exports = UtilsTasks;

function UtilsTasks (grunt) {
  var config = {};

/* CONCAT */
  config.concat = {
    options: {
      separator: ';',
      stripBanners: true,
      banner: '/*! <%= package.name %> - v<%= package.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
    }
  };

/* COPY */
  config.copy = {};
  config.copy.webSrcFontsToWebDist = {
    files: [
      {
        expand: true,
        cwd: global.paths.webSrc + '/assets/fonts',
        src: ['**'],
        dest: global.paths.webDist + '/assets/fonts'
      }
    ]
  };
  config.copy.webSrcImagesToWebDist = {
    files: [
      {
        expand: true,
        cwd: global.paths.webSrc + '/assets/images',
        src: ['**', '!**/sprite_sources/**'],
        dest: global.paths.webDist + '/assets/images'
      }
    ]
  };

/* CLEAN */
  config.clean = {};
  config.clean.generatedCssFilesSrc = {
    files: [{
      expand: true,
      cwd: global.paths.webSrc,
      src: ['**/*.css', '**/*.css.map', '!**/libraries/**/*'],
      dest: global.paths.webSrc
    }]
  };

  config.clean.generatedJSFilesDist = {
    files: [{
      expand: true,
      cwd: global.paths.webDist,
      src: ['**/*.js', '!**/libraries/**/*'],
      dest: global.paths.webDist
    }]
  };

  config.clean.webDist = {
    files: [{
      expand: true,
      cwd: global.paths.webRoot,
      src: ['dist'],
      dest: global.paths.webRoot
    }]
  };
  return config;
}
