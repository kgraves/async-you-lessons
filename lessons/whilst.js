var async = require('async');
var http = require('http');

var count = 0;
var result = '';

async.whilst(function() {
  return !/meerkat/.test(result.trim());
}, function(done) {
  var buffer = '';

  http.get(process.argv[2], function(res) {
    ++count;

    res.on('data', function(chunk) {
      buffer += chunk.toString();
    });

    res.on('end', function() {
      result = buffer;
      done(null, {buffer: buffer, count: count});
    });
  }).on('error', done);
}, function(error, result) {
  if (error) console.log(error);
  console.log(result.count);
});
