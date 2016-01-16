var express = require('express');
//var multer = require('multer');
//var upload = multer({});
var router = express.Router();

var Members = require("../lib/models/members");
var Datas = require("../lib/models/datas");

var bad_request_code = 400; 
var url_error_code = 404; 

/**
 *  POST /datas/create
 *  datas create
 *  @param {Stirng} name
 *
 */

exports.create = function(){
  return function(req, res, next){
    var data = new Datas();
    var datas = req.body || {};
    var image = req.file || null;
    var session = req.session.member || null;
    var created_at = new Date();
    var longtitude_max = 180;
    var longtitude_min = -180;
    var latitude_max = 90;
    var latitude_min = -90;

    data.created_at = created_at;
    
    if(!datas.name){
      var error = new Error(bad_request_code + ' , name not post require ');
      error.status = bad_request_code;
      return next(error);
    } else {
      data.name = datas.name;
    }
    
    if(image != null){
      data.image.filename = image.originalname;
      data.image.mimetype = image.mimetype;
      data.image.buffer = image.buffer;
    }

    data.geo.type = datas.geo.type || "Point";
    if(!datas.geo.coordinates[0]) {
      var error = new Error(bad_request_code + ', geo coordinates not post require longtitude and latitude ');
      error.status = bad_request_code;
      return next(error);
    } else if (datas.geo.coordinates[0] < longtitude_min ){ 
      var error = new Error(bad_request_code + ' , geo longtitude min out of range ');
      error.status = bad_request_code;
      return next(error);
    } else if (datas.geo.coordinates[0] > longtitude_max ){ 
      var error = new Error(bad_request_code + ' , geo longtitude max out of range ');
      error.status = bad_request_code;
      return next(error);

    } else if(!datas.geo.coordinates[1]) {
      var error = new Error(bad_request_code + ' , geo coordinates not post require longtitude and latitude ');
      error.status = bad_request_code;
      return next(error);
    } else if (datas.geo.coordinates[1] < latitude_min ) {
      var error = new Error(bad_request_code  + ' , geo latitude min out of range ');
      error.status = bad_request_code;
      return next(error);
    } else if (datas.geo.coordinates[1] >= latitude_max ){  
      var error = new Error(bad_request_code + ' , geo latitude max out of range ');
      error.status = bad_request_code;
      return next(error);
    } else {
      data.geo.coordinates = datas.geo.coordinates.map(parseFloat);
    }

    data.save(function(err, results){
      if(err) { return next(err, req, res); }
      res.json(results);
    });
  }
};

/**
 *  GET /datas/show
 *  datas list show
 *
 */

exports.show = function(){
  return function(req, res, next){
    var id = req.params.id;

    Datas.findOne({_id:id})
    .exec(function(err, dat){
      res.json(dat);
    });
  }
};

/**
 *  GET /datas/search
 *  datas list show query serach
 *
 */

exports.search = function(){
  return function(req, res, next){

    if(!req.query.geo.type){
      var error = new Error(url_error_code + ' , geo type not find ');
      error.status = url_error_code;
      return next(error);
    } else {
      var type = req.query.type;
    }

    if(!req.query.geo.coordinates){
      var error = new Error(url_error_code + ' , geo coordinates not find ');
      error.status = url_error_code;
      return next(error);
    } else {
      var coordinates = req.query.coordinates;
    }

    Datas.findOne()
    .exec(function(err, dat){
      res.json(dat);
    });
  }
};
