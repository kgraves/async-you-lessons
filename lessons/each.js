var async = require('async');
var http = require('http');

async.each(process.argv.slice(2), function(url, done) {
  http.get(url, function(res) {
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
