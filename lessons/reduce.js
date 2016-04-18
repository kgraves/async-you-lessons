var async = require('async');
var http = require('http');

var coll = ['one', 'two', 'three'];
var url = process.argv[2];

async.reduce(coll, 0, function(memo, item, next) {
  http.get(url + '?number=' + item, function(res) {
    var buffer = '';

    res.on('data', function(data) {
      buffer += data.toString();
    });

    res.on('end', function(data) {
      next(null, memo + Number(buffer));
    });
  }).on('error', function(error) {
    next(error);
  });
}, function(error, result) {
  console.log(result ? result : error);
});
