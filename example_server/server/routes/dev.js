var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dev', { title: 'Development Page' });
});

module.exports = router;
