const config = require("./config");
const gulp = require("gulp");
const styles = require("./styles");
const images = require("./images");
const server = require("./server");
const watch = require("./watch");

gulp.task('default', gulp.series(
  gulp.parallel('styles', 'images'),
  gulp.parallel(
    'watch',
    'server'
  )
));
