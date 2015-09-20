
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
var Request = require("./helper/request");
var csvtojson = tool.csvtojson;

/**
 * Check list 
 */

var list = __dirname + "/check/post.csv";

/**
 * Test
 */

var root = "localhost:8080";
var db = start();
var cookie;

describe('Assert Start', function () {

  before(function(done){
    var tasks = [];

    tasks.push(function(next){
      /**
       * Example cookie  
       */
      //cookie = req.session;
      next(null);
    });

    async.waterfall(tasks, function(err){
      done();
    });
  });

  it('test', function(done){
    csvtojson(list, function(obj){
      async.forEach(obj, function(ck ,cb){
        if(ck.check === "FALSE"){
          cb();
        } else {

          var model = ck.model;
          var req = ck.request;
          var path = ck.path;
          var session = ck.session;
          var test = ck.test;
          var statuscode = ck.statusCode;
          var field = ck.field;
          var attach = ck.attach;
          var param = ck.param;
          var query = ck.query;
          var request = new Request(cookie, path, test, field, attach, param, query, statuscode);  

            switch(req){
              case 'POST':
              case 'post': {
                request.post(cookie,path,test,field,attach,{},{},statuscode,function(err , res){
                  /**
                   * Assert Space
                   */
                  //res.statusCode.should.eql(statuscode);
                  //assert.equal(res.body.name, field.name, test);
                  done();
                });
                break;
              }
              case 'GET': 
              case 'get': {
                request.get(cookie,path,test,{},{},param,query,statuscode,function(err , res){
                  /**
                   * Assert Space
                   */
                  //res.statusCode.should.eql(statuscode);
                  //assert.equal(res.statusCode, statuscode);
                  done();
                });
                break;
              }
              default:
                console.log("Please select request");
              done();
              break;
            }
        }
      }, function(err){
        if (err) {throw err;}
      });
    });
  });
});

