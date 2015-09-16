var gulp = require('gulp');
var del = require('del');
var header = require('gulp-header');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var tributary = require('gulp-tributary');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.repository.url %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

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

function bundle(browser) {
  return gulp.src('./src/ex.js')
    .pipe( tributary( gulp.src('./src/*/' + browser + '.js').pipe(concat('scripts.js')) ) )
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/' + browser + '/'));
}

gulp.task('chrome', function () {
  bundle('chrome');
});

gulp.task('firefox', function () {
  bundle('firefox');
});

gulp.task('safari', function () {
  bundle('safari');
});

gulp.task('default', ['chrome','firefox','safari']);
