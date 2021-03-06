'use strict';

/**
 * Assert Tool.
 */

var start = require('../common');
var db = start();
var mongoose = start.mongoose;
var assert = require('assert');
var should = require('should');
var superagent = require('superagent');
var async = require('async');

var root = 'localhost:8080';

module.exports = Request;

function isObject(obj) {
    return obj === Object(obj);
};

function isString(obj) {
    return typeof obj === "string";
};

function isArray(obj) {
    return Array.isArray(obj);
};

function merge(objs, parent, fn){
    var parent = parent || "";
    if(isObject(objs)){
    for(var key in objs){
            var prop = parent.length ? parent + "[" + key + "]" : key;
      if (isArray(objs[key])){
        for(var i = 0; i < objs[key].length; i++){
          fn(prop, objs[key][i]);
        }
      } else if(isString(objs[key])){
          fn(prop, objs[key]);
      } else {
         merge(objs[key], prop, fn);
      }   
    }   
  }
};

function Request(cookie, path, test, mimetype ,field, attach, param, query, statuscode) {
  
  this.path = path || "localhost:4040";
  this.cookie = cookie || {};
  this.test = test || "";
  this.statuscode = statuscode || {};
  this.mimetype = mimetype || "";
  this.field = field || {};
  this.attach = attach || {};
  this.param = param || {};
  this.query = query ||{};

  return this;
};

//////////////////
//              //
// POST Reqeust //
//              //
//////////////////

Request.prototype.post = function(cookie, path, test, mimetype, field, attach, param, query, statuscode, next){

  var pt = path || this.path || "";
  var path = (root + pt).replace(":id" , param);;

  var cookie = cookie || this.cookie || {};
  var test = test || this.test || "";
  var mimetype = this.mimetype || "";
  var statuscode = this.statuscode || {};
  var field = this.field || {};
  var attach = this.attach || {};
  var param = this.param || {};
  var query = this.query || {};

  var tasks = [];
  var req = superagent.post(path);
  req.set("cookie", cookie)

  /*
  tasks.push(function(cb){
    if(param != null){
      req.param(param)
    }
    cb(null);
  });
 */

  tasks.push(function(cb){
    if(query != null){
      req.query(query)
    }
    cb(null);
  });

  tasks.push(function(cb){
    if(mimetype === 'multipart/form-data'){
      merge(field, null, function(key, value){
        req.field(key , value)
        cb(null);
      });
    } else {
      req.send(field);
      cb(null);
    }
  });

  tasks.push(function(cb){
    cb(null);
  });

  async.waterfall(tasks, function(err){
    if(mimetype === 'multipart/form-data'){
      if (Object.keys(attach).length != 0){
        merge(attach, null, function(key, val){
          var value = __dirname + val;
          req.attach(key , value)
        });
      };
    };
    req.end(function(err, res){
      if(err) {throw err;}
      next(err, res);
    });
  });
};


//////////////////
//              //
// GET Reqeust //
//              //
//////////////////

Request.prototype.get = function(cookie, path, test, mimetype, field, attach, param, query, statuscode, next){

  var pt = path || this.path || "";
  var path = (root + pt).replace(":id", param);

  var cookie = cookie || this.cookie || {};
  var test = test || this.test || "";
  var statuscode = this.statuscode || {};
  var field = this.field || {};
  var attach = this.attach || {};
  var param = this.param || {};
  var query = this.query || {};

  var req = superagent.get(path);
  req.set("cookie", cookie)

  if(query != null){
    req.query(query)
  }

  req.end(function(err, res){
    if(err) {throw err;}
    next(err, res);
  });

};
