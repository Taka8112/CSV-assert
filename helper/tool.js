'use strict';

/**
 * Assert Tool.
 */

var async = require('async');
var fs = require("fs");
var superagent = require('superagent');
var Converter = require("csvtojson").Converter;
var Request = require("./request");

//////////////////
//              //
//  CSV → JSON  //
//              //
//////////////////

exports.csvtojson = function(path,next){
  var param = {};
  var Obj = [];
  //var json;
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
      //fs.writeFile('./check/list.js',  'module.exports = ' + JSON.stringify(Obj) + ';');
      next(Obj);
      //return next(Obj);
    });
  });

  //read from file
  fileStream.pipe(converter);

};
 
exports.check = function(property, ckie ,next){

  describe('Check', function(){

    var check = property.check || '';
    var req = property.request || '';
    var path = property.path || '';
    var test = property.test || '';
    var mimetype = property.mimetype || '';
    var field = property.field || {};
    var attach = property.attach || {};
    var param = property.param || {};
    var query = property.query || {};
    var statuscode = property.statusCode || '';

    var session = property.session || ''; 
    var cookie;
    if (session.match(/ON/i)) {
      if(ckie) {
        cookie = ckie || {};
      } else {
        console.log('cookie undefind');
      }
    } else {
      console.log('cookie undefind');
    };

    var request = new Request(cookie, path, test, mimetype, field, attach, param, query, statuscode);
 
    if(check.match(/FALSE/i)) {
      next();
    } else if(check.match(/TRUE/i)) {

      it('request : ' + req + ' , path : ' + path  + ' , session : ' + session + ', test : ' + test, function(done){
        
        if(req.match(/POST/i)){
          request.post(cookie,path,test,mimetype,field,attach,param,query,statuscode,function(err, res){
            done();
            next(res);
          });
        } else if(req.match(/GET/i)) {
          request.get(cookie,path,test,mimetype,field,attach,param,query,statuscode,function(err, res){
            done();
            next(res);
          });
        } else {
          console.log('undefind');
        };
      });
    };
  });
};
