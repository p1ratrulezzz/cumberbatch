const config = require("./config");
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

// режим разработки?
const dev = !process.env.NODE_ENV || process.env.NODE_ENV == "dev";

gulp.task(function images(cb) {
  gulp
    .src([config.path.img + "/**/*"])
    .pipe(
      gulpIf(
        dev, // Если не для разработки то применяем сжатие
        cache(
          imagemin([
            imagemin.gifsicle({ interlaced: true }),
            // TODO падает в процессе сборки
            // imagemin.jpegtran({progressive: true}),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
              plugins: [
                { removeViewBox: true },
                { cleanupIDs: false },
                { removeComments: true },
                { removeXMLProclnst: true },
                { cleanupAttrs: true },
                { removeTitle: true },
                { removeDoctype: true },
                { removeDesc: true },
                { removeStyleElement: true },
                { convertShapeToPath: true },
                { mergePaths: true },
                {
                  cleanupNumericValues: {
                    floatPrecision: 2
                  }
                }
              ]
            })
          ])
        )
      )
    )
    .pipe(gulp.dest(config.path.dist.img));
  cb();
});
