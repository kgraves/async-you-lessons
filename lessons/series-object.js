var async = require('async');
var http = require('http');

async.series({
  requestOne: function(done) {
    var buffer = '';

    http.get(process.argv[2], function(res) {
      res.on('data', function(data) {
        buffer += data.toString();
      })
      res.on('end', function(data) {
        done(null, buffer);
      })
    }).on('error', function(error) {
      done(error);
    });
  },

  requestTwo: function(done) {
    var buffer = '';

    http.get(process.argv[3], function(res) {
      res.on('data', function(data) {
        buffer += data.toString();
      })
      res.on('end', function(data) {
        done(null, buffer);
      })
    }).on('error', function(error) {
      done(error);
    });
  }
}, function done(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
  }
});
