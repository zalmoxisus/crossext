var process = require('./process');

function createEx(dir) {
  ['chrome','firefox','safari'].map( function(browser){
    process(browser, dir);
  });
}

module.exports = createEx;