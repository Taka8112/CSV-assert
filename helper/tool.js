'use strict';

/**
 * Assert Tool.
 */

var async = require('async');
var fs = require("fs");
var Converter = require("csvtojson").Converter;

//////////////////
//              //
//  CSV → JSON  //
//              //
//////////////////

exports.csvtojson = function(path,next){
  var param = {};
  var Obj = [];
  var json;
  var fileStream = fs.createReadStream(path);
  var converter = new Converter(param);

  converter.on("end_parsed", function (jsonObj) {
    async.forEach(jsonObj, function(j, cb){
      if(j.check === 'TRUE' || j.check === 'FALSE'){
        Obj.push(j);
      }
      cb();
    }, function(err){
      if(err) {throw err;}
      return next(Obj);
    });
  });

  //read from file
  fileStream.pipe(converter);

};
 

