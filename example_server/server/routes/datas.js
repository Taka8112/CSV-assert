var express = require('express');
var router = express.Router();

var Members = require("../lib/models/members");
var Datas = require("../lib/models/datas");

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
    var session = req.session.member || null;
    var created_at = new Date();
    var image;
    var longtitude_max = 180;
    var longtitude_min = -180;
    var latitude_max = 90;
    var latitude_min = -90;
    
    data.name = datas.name || "No name";
    data.created_at = created_at;
    data.geo.coordinates = datas.geo.coordinates.map(parseFloat);
    
    if(!data.geo){
      return next(new Error([400,[' geo no post ']]), req, res);
    } else {
      data.geo.type = datas.geo.type || "Point";

      if (data.geo.coordinates[0] < longtitude_min ){ 
        return next(new Error([400,[' geo longtitude min out of range ']]), req, res);
      } else if (data.geo.coordinates[0] > longtitude_max ){ 
        return next(new Error([400,[' geo longtitude max out of range ']]), req, res);
      } else {
        console.log('laoo');
        if (data.geo.coordinates[1] < latitude_min ) {
          return next(new Error([400,[' geo latitude min out of range ']]), req, res);
        } else if ( data.geo.coordinates[1] >= latitude_max ){  
          return next(new Error([400,[' geo latitude max out of range ']]), req, res);
        }
      }
    }

    data.save(function(err, results){
      if(err) { return next(err, req, res); }
      res.json(results);
    });
  }
};

/**
 *  GET /datas/show
 *  :id data show
 *  @param {Object_id} :id
 *
 */

exports.show = function(){
  return function(req, res, next){

  }
};
