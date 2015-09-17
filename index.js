var make = require('./gulp/make');

function makeEx(dir) {
  ['chrome','firefox','safari'].map( function(browser){
    make(browser, dir);
  });
}

module.exports = {
  make: makeEx
};