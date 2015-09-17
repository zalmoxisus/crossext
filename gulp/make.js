var gulp = require('gulp');
var path = require('path');
var header = require('gulp-header');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var tributary = require('gulp-tributary');

var pkg = require('../package.json');
var banner = ['/**',
  ' * Ex - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

function make(browser, dir) {
  return gulp.src(path.join(__dirname, '../src/ex.js'))
    .pipe( tributary( gulp.src(path.join(__dirname, '../src/*/' + browser + '.js') ).pipe(concat('scripts')) ) )
    .pipe(eslint()).pipe(eslint.format()).pipe(eslint.failOnError())
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe( gulp.dest(path.join((dir||'./dist/'), browser + '/')) );
}

module.exports = make;