var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var run = require('gulp-run');

gulp.task("greet", function() {
  console.log('hello');
});

gulp.task("default", ['greet', 'reporttwo']);

gulp.task("report", function() {
  fs.appendFile('./time.log', new Date() + "\n");
});

gulp.task("clean", function() {
  fs.unlink('time.log');
});

gulp.task("cleantwo", function() {
  del("time.log");
});
gulp.task("cleanthree", function() {
  run("rm time.log").exec();
});

gulp.task("reporttwo", function() {
  run("echo The Date is `date` >> time.log").exec();
});

gulp.task('build', function() {

});
