var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var run = require('gulp-run');
var concat = require("gulp-concat");
var coffee = require('gulp-coffee');
var addsrc = require('gulp-add-src');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
// gulp.task("greet", function() {
//   console.log('hello');
// });
//
// gulp.task("default", ['greet', 'reporttwo']);
//
// gulp.task("report", function() {
//   fs.appendFile('./time.log', new Date() + "\n");
// });
//
// gulp.task("clean", function() {
//   fs.unlink('time.log');
// });
//
// gulp.task("cleantwo", function() {
//   del("time.log");
// });
// gulp.task("cleanthree", function() {
//   run("rm time.log").exec();
// });
//
// gulp.task("reporttwo", function() {
//   run("echo The Date is `date` >> time.log").exec();
// });


gulp.task("deldist", function() {
  del("dist");
});

gulp.task('coffee', function() {
  return gulp.src('./src/*.coffee')
  .pipe(coffee())
  .pipe(notify({ message: 'Coffee compilation task complete' }));
});

gulp.task('build', ["deldist", "coffee", "styles"], function() {
  gulp.src("src/*.coffee")
  .pipe(coffee())
  .pipe(addsrc("src/*.js"))
  .pipe(concat("bundle.js")) //concats thos files into a bundle
  .pipe(uglify())
  .pipe(gulp.dest("dist"))//sends that bundle to a destination
  .pipe(notify({ message: 'Build task complete' }));
});

gulp.task('watch', function() {
  gulp.watch("src/*", ['build']);
});

gulp.task('compress', function() {
  return gulp.src('dist/bundle.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
  .pipe(notify({ message: 'uglification task complete' }));
});

gulp.task('styles', function() {
  return sass('src/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task("default", ["build", "watch"]);
