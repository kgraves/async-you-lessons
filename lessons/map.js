var async = require('async');
var http = require('http');

async.map(process.argv.slice(2), function(url, done) {
  http.get(url, function(res) {
    var buffer = '';

    res.on('data', function(data) {
      buffer += data.toString();
    });

    res.on('end', function(data) {
      return done(null, buffer);
    });
  }).on('error', function(error) {
    done(error);
  });
}, function(error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});
