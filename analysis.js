
'use strict';

/**
 * Module dependencies.
 */

var start = require("./common");
var mongoose = start.mongoose;
var assert = require("assert");
var should = require("should");
var fs = require("fs");
var superagent = require("superagent");
var async = require("async");

var tool = require("./helper/tool");
var csvtojson = tool.csvtojson;
var check = tool.check;
var test = tool.test;

/**
 * Session Request 
 */

function sessionRequest(callback) {
  var tasks = [];

  tasks.push(function(next){
    superagent
    .post('localhost:8080/signup')
    .send({name: 'noff'})
    .send({email: 'ngc.ngc274@gmail.com'})
    .send({password: 'Password'})
    .end(function(err, res){
      next(null);
    });
  });

  tasks.push(function(next){
    superagent
    .post('localhost:8080/login')
    .send({name_or_email: 'noff'})
    .send({Password: 'Password'})
    .end(function(err, res){
      cookie = res.headers['set-cookie'];
      next(null);
    });
  });

  async.waterfall(tasks, function(err){
    callback(cookie);
  });
};


/**
 * Check list 
 */

var source = __dirname + "/check/get.csv";

/**
 * Test
 */

var root = "localhost:8080";
var db = start();
var cookie = {};
var session;


describe('CSV-Assert', function(){

  var properties = [];
  async.series([
    function(callback){
      before(function(done){
        sessionRequest(function(cookie){
          done();
          callback();
        });
      });
    }, function(callback){
      csvtojson(source, function(obj){
        properties = obj;
        callback();
      });
    }
  ], function(err){
    describe('Check',function(){
      properties.forEach(function(property){

        if(property.check.match(/TRUE/i)){
          it(property.test, function(done){
            test(property, cookie , function(res){
              console.log(res.req.path);
              //assert.equal(res.statusCode, 200)
              done();
            });
          });
        } else {
          it.skip(property.test, function(done){
            done();
          });
        };

      });
    });
  });
  
  it('Start', function(done){
    done();
  })

});
