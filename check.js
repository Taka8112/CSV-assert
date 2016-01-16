
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
 * Check list 
 */

var source = __dirname + "/check/get.csv";

/**
 * Test
 */

var root = "localhost:8080";
var db = start();
var id = {};
var cookie = {};
var session;


describe('CSV-Assert', function(){

  var properties = [];
  async.series([
    function(callback){
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
            test(property, cookie , id ,function(res){

              //assert.equal(res.statusCode, 200) //assert function

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
