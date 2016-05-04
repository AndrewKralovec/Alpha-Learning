/*
 * Created by Andrew Kralovec 
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Configuring Passport
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session); // TWO GOD DAMN HOURS FOR THIS FUCKING OBJECT. GOD DAMN

var routes = require('./routes/index');
var login = require('./routes/login');
var account = require('./routes/account');
var courses = require('./routes/courses');
var upload = require('./routes/upload');
var post = require('./routes/post');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));
app.use(logger('dev'));
// Support encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Add public and uplaods to static folders 
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(session({
    secret: 'KralovecSecret',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
      url: 'mongodb://localhost/AlphaLearning',
      autoRemove: 'interval',
      autoRemoveInterval: 10 // In minutes. Default
    })
}));


// Have root route to the login page.
// Once sessions are in place, the routes will resemble a average websites. 
app.use('/', login);
app.use('/Home', routes);
app.use('/Register', account); // Looks ulgy need to renamte this route
app.use('/Courses', courses);
app.use('/upload', upload);
app.use('/post',post);

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


module.exports = app;
