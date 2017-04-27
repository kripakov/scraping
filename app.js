var Nightmare = require("nightmare"),
    nightmare = Nightmare({
      show: true,
      switches: {
        'ignore-certificate-errors': true
      }
    }),
    async = require("async"),
    request = require("request"),
    cheerio = require("cheerio"),
    fs = require('fs'),
    underscore = require('underscore'),
    urls = require('url'),
    util = require('util'),
    headers = {
      'User-Agent': 'mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/49.0.2623.112 safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    options = {
      url = 'http://www.rossettoitalia.com/en/products/design'
      rejectUnauthorized: false,
      method: 'GET',
      headers: headers,
      maxRedirects: 100
  };

request(options, function(err, response, body) {
    if (err) {
      throw err;
    } else {
      var $ = cheerio.load(body);
      async.series([
        function(callback) {
          $('.refills-wrapper').find('')
          callback(null, 'one');
        },
        function(callback) {
          async.eachSeries( function(item, callback) {

          });
            callback(null, 'two');
        }
    ],
    function(err, results) {

    });
      nightmare
      .useragent('mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/49.0.2623.112 safari/537.36')
      .viewport(1350, 709)
      .goto('http://www.rossettoitalia.com/en/products/design')
      .wait(3500)
      .inject('js', 'public/jquery.js')
      .evaluate(function() {

      })
      .wait(1000)
      }
  });