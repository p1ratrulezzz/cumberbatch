const config = require("./config");
const gulp = require("gulp");
const styles = require("./styles");
const images = require("./images");

// режим разработки?
const dev = !process.env.NODE_ENV || process.env.NODE_ENV == "dev";

gulp.task("watch", function (cb) {
  global.watch = true;

  if(dev) {
    gulp.watch(config.path.styles + '**/*.*', gulp.parallel('styles'));
    gulp.watch(config.path.images + '**/*.*', gulp.parallel('images'));
  }
  cb()
});
