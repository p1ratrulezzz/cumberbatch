const config = require("./config");
const gulp = require("gulp");
const browserSync = require('browser-sync').create();

// режим разработки?
const dev = !process.env.NODE_ENV || process.env.NODE_ENV == "dev";

gulp.task("server", function (cb) {
  if(dev) {
    browserSync.init(
      config.server,
      cb
    );
  } 
  cb();
});
