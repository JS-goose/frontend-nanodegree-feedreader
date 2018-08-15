var gulp = require("gulp");
var browserSync = require("browser-sync").create();

// Static server
gulp.task("browser-sync", function() {
browserSync.init({
  server: {
    baseDir: "./",
  }
});
    gulp.watch(['./*.html' ,'js/*.js', 'css/*.css']).on('change', browserSync.reload);
});