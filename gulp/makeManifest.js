var gulp = require('gulp');
var gutil = require('gulp-util');

function format(src, pkg, browser) {
  var str;
  switch(browser){
    case 'chrome':
      str = '{\n\t' +
          '"manifest_version": 2,\n\t' +
          '"name": "' + (src.name || pkg.name) + '",\n\t' +
          '"name": "' + (src.version || pkg.version) + '"' +
        '}';
      return stringSrc('package.json', str);
  }
}

function stringSrc(filename, str) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(str) }));
    this.push(null)
  };
  return src;
}

function makeManifest(srcJSON, pkgJSON, dir) {
  var browser = 'chrome';
  format(srcJSON, pkgJSON, browser).pipe(gulp.dest((dir||'./dist/') + browser + '/'));
}

module.exports = makeManifest;