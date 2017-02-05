var express = require('express');
var router = express.Router();
const http = require('http');
const dns = require('dns');

/* GET home page. */
router.get('/', function (req, res, next) {
  var options = {
    port: 3000,
    hostname: 'localhost',
    path: '/users'
  };
  callback = function (response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
    });
  }

  http.request(options, callback).end();

  dns.lookup('nodejs.org', (err, addresses, family) => {
    console.log('addresses:', addresses);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
