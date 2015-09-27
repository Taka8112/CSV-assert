var express = require('express');
var router = express.Router();

var Members = require("../lib/models/members");

exports.signup = function(){
  return function(req, res, next){
    var name = req.body.name || "";
    var email = req.body.email || "";

    Members.findOne({$or:[
      {name: req.body.name},
      {email: req.body.email}
    ]})
    .exec(function(err, mem){
      if(err){
        return next(err, req, res);
      }
      if(mem){
        return next(err, req, res);
      } else {
        var member = new Members();
        member.name = req.body.name;
        member.email = req.body.email;
        
        member.save(function(err, m){
          res.json(m);
        });
      }
    });
  };
};
