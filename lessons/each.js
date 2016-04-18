/**
var async = require('async');
var http = require('http');

// async.each([process.argv[2], process.argv[3]], function(url, done) {
async.each(process.argv.slice(2), function(url, done) {
  // var buffer = '';
  http.get(url.toString(), function(res) {
    res.on('data', function(data) {
      console.log('in data');
    });

    res.on('end', function(data) {
      console.log('in end');
      done(null);
    });
  }).on('error', function(error) {
    console.log('in error');
    console.log(error);
    done(error);
  });
}, function(error) {
  console.log('in done/error');
  if (error) {
    console.log(error);
  }
});
*/

var http = require('http')
  , async = require('async');

async.each(process.argv.slice(2), function(item, done){
  http.get(item, function(res){
    res.on('data', function(chunk){
    });

    res.on('end', function(){
      done(null);
    });
  }).on('error', function(err){
    done(err);
  });
},
function(err){
  if(err) console.log(err);
});
