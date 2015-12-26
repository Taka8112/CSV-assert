'use strict'
var multer = require("multer");
var bad_request_code = 400;

// session check //
exports.sessionCheck = function(){
  return function(req, res, next){
    var session = req.session.account;
    if(!session){
      var error = new Error(bad_request_code + ' , No Session!! ');
      error.status = bad_request_code;
      return next(error);
    } else {
      next();
    }
  };
};

// upload //
exports.upload = function(){
  return function(req ,res , next){
    next();
  };
};
