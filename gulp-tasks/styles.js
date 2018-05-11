const config = require("./config");
const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const gulpIf = require("gulp-if");
// const gulpStylelint = require('gulp-stylelint');
const stylelint = require('stylelint');
const reporter = require('postcss-browser-reporter');
// const browserSync = require('browser-sync').create();

// режим разработки?
const dev = !process.env.NODE_ENV || process.env.NODE_ENV == "dev";


// Настройки postcss
const postcssPlugins = [
  require('precss')({
    import: {
      extension: 'scss'
    }
  }), // транспилинг scss 
  // require('postcss-scss'),
  require("css-mqpacker"), // группирует медиа выражения
  require('postcss-pseudo-class-enter'), // позволяет писать один псевдокласс для :focus и :hover
  autoprefixer(),
];

if (dev) { // Если режим разработки то определенный набор плагинов для postcss
  postcssPlugins.push(
    // stylelint(),
    reporter({
      selector: 'body:before',
      clearReportedMessages: true
    })
  )
} else {
  postcssPlugins.push(require('cssnano')({
    preset: 'default',
  }))
}

gulp.task("styles", function (cb) {
  gulp
    .src([config.path.styles + "*.scss", config.path.styles + "*.css"])
    .pipe(gulpIf(dev, sourcemaps.init()))
    .pipe(
      plumber({
        errorHandler: function (error) {
          console.log(error.message);
          this.emit("end");
        }
      })
    )
    // .pipe(sass())

    .pipe(postcss(postcssPlugins))
    // .pipe(gulpIf(!dev, postcss([ // Если продакшен то сжимаем стили 
    //   require('cssnano')({
    //     preset: 'default',
    //   })
    // ])))
    // .pipe(gulpStylelint({
    //   reporters: [
    //     {formatter: 'string', console: true}
    //   ]
    // }))
    .pipe(gulpIf(dev, sourcemaps.write('.')))
    .pipe(gulp.dest(config.path.dist.styles))
  // .pipe(gulpIf(dev, browserSync.stream()))
  // .pipe(browserSync.stream())
  cb();
});
