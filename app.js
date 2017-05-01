var async = require("async"),
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

function checkDirectory(directory, callback) {
  fs.stat(directory, function(err, stats) {
    if (err && err.errno === 34) {
      fs.mkdir(directory, callback);
    } else {
      callback(err)
    }
  });
}

function mkdir(directory, callback) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, 0766, function(err) {
      if (err) {
        throw err;
      }
      callback();
    });
  }
}

function saveImg(flsv,url, callback) {
  var my_array;
  my_array = (urls.parse(url).pathname.split("/"));
  //console.log(my_array);
  console.log('last elem',my_array.slice(-1).pop());

  request(url, {encoding: 'binary'}, function(error, response, body) {
    fs.writeFile(flsv + '/' + my_array.slice(-1).pop(), body, 'binary', function (err) {

    });
  });
}

async.series([
    function(callback) {
      request(options, function(err, response, body) {
        if (err) {
          throw err;
        } else {
          var $ = cheerio.load(body),
            cll, tpd, src,cllchild = [];
          $('.refills-wrapper').find('.categorie').children().each(function(i, e) {
            //console.log('e',e);
            /*
              console.log($(e).find('img').attr('alt'));  // type product
              console.log('/////////////////////////');
              console.log($(e).find('a').attr('href'));   // img src
              console.log('/////////////////////////');
              console.log($(e).find('img').attr('src'));  // src
              console.log('/////////////////////////');
              console.log($(e).find('span.top').text())   // collection
              console.log('**************************');
            */
            cll = $(e).find('span.top').text(),
            tpd = $(e).find('img').attr('alt'),
            src = $(e).find('img').attr('src');

            /*
            console.log(cll);
            console.log('**');
            console.log(cll + '/' + tpd);
            */

            console.log(__dirname + '/' + cll + '/' + tpd);
            
            mkdir(cll);

            mkdir(__dirname + '/' + cll + '/' + tpd);

            saveImg(__dirname + '/' + cll + '/' + tpd, 'http:' + src);
              /*
              checkDirectory("collection", function(error) {  
                if(error) {
                  console.log("oh no!!!", error);
                } else {
                  //Carry on, all good, directory exists / created.
                }
              });
              */
          });
        }
      });
      callback(null, e);
    },
    function(callback) {
      callback(null, 'two');
    }
  ],
  function(err, results) {

  });