'use strict';

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var http         = require("http");
var mongoose     = require("mongoose");
var session      = require("express-session");
var RedisStore   = require("connect-redis")(session);
var multer       = require("multer");

var storage      = multer.memoryStorage();
var upload       = multer({
  dest: './uploads/',
  inMemory: true,
  storage: storage,
  onError: function (error, next) {
    console.log(error)
    next(error)
  }
});

var app = express();

var middleware = require("./lib/index");
var sessionCheck = middleware.sessionCheck;

// mongoose connect
var uri = 'mongodb://localhost/example_server';
mongoose.connect(uri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8080);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "secret key",
  resave: true,
  saveUninitialized: true,
  store: new RedisStore(),
  cookie: {
    maxAge: 30 * 60 * 1000 //30min
  }
})); 

app.use(express.static(path.join(__dirname, 'public')));
//app.use(multer({dest: './uploads/'}).single('singleInputFileName'));

// API
// 
var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/', routes);
app.use('/users', users);

var dev = require('./routes/dev');
app.use('/dev', dev);
var members = require('./routes/members');
var datas = require('./routes/datas');

app.post('/signup' ,members.signup());
app.post('/login',  members.login());
app.get('/logout',  members.logout());
//app.post('/datas/create', datas.create());
app.post('/datas/create', upload.single('image') ,datas.create());
//app.post('/datas/create' ,sessionCheck() ,upload.single('image') ,datas.create());
app.get('/datas/show/:id', sessionCheck(), datas.show());
app.get('/datas/search', sessionCheck(), datas.search());

// ERROR handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//
http.createServer(app).listen(app.get("port"), function(){
  //https.createServer(options, app).listen(app.get("port"), function(){ 
  console.log("[Server listening on port]:" + app.get("port"));
})


module.exports = app;
