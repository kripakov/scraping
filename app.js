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
      url: 'http://www.rossettoitalia.com/en/products/design',
      rejectUnauthorized: false,
      method: 'GET',
      headers: headers,
      maxRedirects: 100
  };

request(options, function(err, response, body) {
    console.log('start');
    if (err) {
      throw err;
    } else {
      
      var $ = cheerio.load(body);
      function checkDirectory(directory, callback) {  
        fs.stat(directory, function(err, stats) {
          console.log(stats)
          //Check if error defined and the error code is "not exists"
          if (err && err.errno === 34) {
            //Create the directory, call the callback.
            fs.mkdir(directory, callback);
          } else {
            //just in case there was a different error:
            callback(err)
          }
        });
      }
      $('.refills-wrapper').find('.categorie').children().each(function(i,e){
        //console.log('e',e);
        /*
        console.log($(e).find('img').attr('alt'));  // type product
        console.log('/////////////////////////');
        console.log($(e).find('a').attr('href'));   // img
        console.log('/////////////////////////');
        console.log($(e).find('img').attr('src'));  // src
        console.log('/////////////////////////');
        console.log($(e).find('span.top').text())   // collection
        console.log('**************************');
  */
        checkDirectory("collection", function(error) {  
          if(error) {
            console.log("oh no!!!", error);
          } else {
            //Carry on, all good, directory exists / created.
          }
        });

      });


      /*async.series([
        function(callback) {
          $('.refills-wrapper').find('.item .x4').each(function(i,e){
            //console.log('e',e);
            callback(null, e);
          })
        },
        function(callback) {
         
          async.eachSeries( function(item, callback) {

          });
            callback(null, 'two');
           
        }
    ],
    function(err, results) {
      console.log(results)
      nightmare
        .useragent('mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/49.0.2623.112 safari/537.36')
        .viewport(1350, 709)
        .goto('http://www.rossettoitalia.com/en/products/design')
        .wait(3500)
        .inject('js', 'public/jquery.js')
        .evaluate(function() {

        })
        .wait(1000)
      });*/
    }
});