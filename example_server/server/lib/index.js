'use strict'

// session check //
exports.sessionCheck = function(){
  return function(req, res, next){
    var session = req.session || {};
    if(!session){
      return next(new Error('No Session!!'));
    } else {
      next();
    }
  };
};
