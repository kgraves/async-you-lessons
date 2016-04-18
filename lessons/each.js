var async = require('async');
var http = require('http');

// async.each([process.argv[2], process.argv[3]], function(url, done) {
async.each(process.argv.slice(2), function(url, done) {
  // var buffer = '';
  http.get(url.toString(), function(res) {
    res.on('data', function(data) {
    });

    res.on('end', function(data) {
      done(null);
    });
  }).on('error', function(error) {
    done(error);
  });
}, function(error) {
  if (error) {
    console.log(error);
  }
});
