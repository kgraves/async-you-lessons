/**
## Challenge

Write a program that will receive two URLs as the first and second command-line arguments.

Using http.get, create a GET request to these URLs and pass the response body
to the callback.

Pass in an object of task functions, using the property names requestOne and
requestTwo, to async.series.

console.log the results in the callback for series when all the task functions
have completed.
*/

var async = require('async');
var fs = require('fs');
var http = require('http');
// var path = process.argv[2];

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
