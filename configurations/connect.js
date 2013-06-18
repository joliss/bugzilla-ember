var url = require('url');
var request = require('http').request;

module.exports = {
  server: {
    options: {
      port: 8000,
      hostname: '0.0.0.0',
      base: 'tmp/public',
    }
  }
};

function blockDuringBuild(req,res,next){
  if (process.isLockedDuringBuild) {
    var tryAgainSoon = function() {
      setTimeout(function(){
        if (process.isLockedDuringBuild) {
          tryAgainSoon();
        } else {
          next();
        }
      }, 100);
    };
    tryAgainSoon();
  } else {
    next();
  }
}
