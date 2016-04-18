var async = require('async');
var http = require('http');

var host = process.argv[2];
var port = process.argv[3];
var url = 'http://' + host + ':' + port;

async.series({
  posts: function (done) {
    async.times(5, function(id, callback) {
      createUser(++id, callback);
    }, function(error, results) {
      done(error, results);
    });
  },

  gets: function(done) {
    http.get(url + '/users', function(res) {
      var buffer = '';

      res.on('data', function(data) {
        buffer += data.toString();
      })

      res.on('end', function(data) {
        done(null, buffer);
      })
    }).on('error', done);
  }
}, function(err, result){
  if (err) return console.log(err);
  console.log(result.gets);
});

function createUser(id, done) {
  var userData = JSON.stringify({'user_id': id});

  var opts = {
    hostname: host,
    port: port,
    path: '/users/create',
    method: 'POST',
    headers: {
      'Content-Length': userData.length
    }
  };

  var req = http.request(opts, function(res){
    res.on('data', function(chunk){});

    res.on('end', function(){
      done();
    });
  });

  req.on('error', function(error) {
    done(error);
  });

  req.write(userData);
  req.end();
};
