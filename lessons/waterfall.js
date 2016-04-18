var async = require('async');
var fs = require('fs');
var http = require('http');
var path = process.argv[2];

async.waterfall([
  function readFile(done) {
    fs.readFile(path, function(error, data) {
      if (error) {
        done(error);
      } else {
        done(null, data);
      }
    });
  },

  function doGet(url, done) {
    var buffer = '';

    http.get(url.toString(), function(res) {
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
], function done(error, result) {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
