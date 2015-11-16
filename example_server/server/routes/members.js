var express = require('express');
var multer = require('multer');
var upload = multer({});
var router = express.Router();

var Members = require("../lib/models/members");

/**
 *  POST /signup
 *  member registration
 *  @param {Stirng} name
 *  @param {Stirng} email 
 *  @param {Stirng} password
 *
 */
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
        
        member.save(function(err, mem){
          res.json(mem);
        });
      }
    });
  };
};

/**
 *  POST /login
 *  member login
 *  @param {Stirng} name_or_email
 *  @param {Stirng} password
 *
 */

exports.login = function() {
  return function(req, res, next){
    var user = req.body || {};
    var password = user.password;

    Members.findOne({$or: [
      {name: user.name_or_email},
      {email: user.name_or_email}
    ]})
    .exec(function(err, member){
      if(!member){
        req.session.destroy(function(){
          return next(new Error('Member not found'));
        });
      } else {
        req.session.regenerate(function(){
          req.session.account = member;
          res.json(member);
        });
      }
    });
  };
};

/**
 *  GET /logout
 *  session out
 *
 */

exports.logout = function(){
  return function(req, res, next){
    var session = req.session.account._id;
    req.session.destroy(function(){
      res.json("session delete account is : " + session);
    });
  }
};

