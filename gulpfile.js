var gulp = require('gulp');
var del = require('del');
var process = require('./process');
var processAll = require('./index');

var paths = {
  scripts: ['src/**/*.js', 'src/**/**/*.js']
};

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['default']);
});

//clean build directory
gulp.task('clean', function (cb) {
  del([
    'dist/*'
  ], cb);
});

gulp.task('chrome', function () {
  process('chrome');
});

gulp.task('firefox', function () {
  process('firefox');
});

gulp.task('safari', function () {
  process('safari');
});

gulp.task('all', function () {
  processAll();
});

gulp.task('default', ['all']);
