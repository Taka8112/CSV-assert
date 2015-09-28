var express = require('express');
var router = express.Router();

var Members = require("../lib/models/members");

exports.signup = function(){
  return function(req, res, next){
    var name = req.body.name || "";
    var email = req.body.email || "";
    var password = req.body.password || "";

    Members.findOne({$or:[
      {name: req.body.name},
      {email: req.body.email},
      {password: req.body.password}
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
        member.password = req.body.password;
        
        member.save(function(err, m){
          res.json(m);
        });
      }
    });
  };
};

exports.login = function() {
  return function(req, res, next){
    var user = req.body || {};
    var password = user.password;

    Members.findOne({$or: [
      {name: user.name_or_email},
      {email: user.name_or_email}
    ]})
    .exec(function(err, member){
      if(member){
        return next(new Error('error'));
      } else {
        res.json(req.body);
      }
    });
  };
};
