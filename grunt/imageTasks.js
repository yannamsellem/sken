// sprite & imagemin
module.exports = ImageTasks

function ImageTasks (grunt) {
  var config = {}
/* SPRITE */
  config.sprite = {}
  config.sprite.dev = {
    'src': [`${global.paths.webSrc}/assets/images/sprite_sources/*`],
    'dest': `${global.paths.webSrc}/assets/images/sprite.png`,
    'destCss': `${global.paths.webSrc}/assets/styles/imgConsts.scss`,
    'imgPath': '/images/sprite.png',
    'algorithm': 'binary-tree',
    'padding': 4,
    'engine': 'pixelsmith',
    'cssFormat': 'scss',
    'algorithmOpts': { 'sort': false },
    'imgOpts': {
      'format': 'png',
      'timeout': 10000
    }
  }
  config.sprite.dist = {
    'src': [`${global.paths.webSrc}/assets/images/sprite_sources/*`],
    'dest': `${global.paths.webDist}/assets/images/sprite.png`,
    'destCss': `${global.paths.webSrc}/assets/styles/imgConsts.scss`,
    'imgPath': '/images/sprite.png',
    'algorithm': 'binary-tree',
    'padding': 4,
    'engine': 'pixelsmith',
    'cssFormat': 'scss',
    'algorithmOpts': { 'sort': false },
    'engineOpts': { 'imagemagick': true },
    'imgOpts': {
      'format': 'png',
      'timeout': 10000
    }
  }

/* IMAGEMIN */
  config.imagemin = {
    dist: {
      options: {
        optimizationLevel: 7
      },
      files: [{
        expand: true,
        cwd: `${global.paths.webDist}/assets/images/`,
        src: ['**/*.{png,jpg,gif,svg}'],
        dest: `${global.paths.webDist}/assets/images/`
      }]
    }
  }
  return config
}
