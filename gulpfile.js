var gulp = require('gulp');
var del = require('del');
var make = require('./gulp/make');
var ex = require('./index');

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
  make('chrome');
});

gulp.task('firefox', function () {
  make('firefox');
});

gulp.task('safari', function () {
  make('safari');
});

gulp.task('all', function () {
  ex.make();
});

gulp.task('manifest', function () {
  var srcJSON = require('./.tmp/ex.json');
  var pkgJSON = require('./package.json');
  ex.manifest(srcJSON, pkgJSON);
});

gulp.task('default', ['all']);
