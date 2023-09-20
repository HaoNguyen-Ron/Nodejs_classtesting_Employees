var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { default: mongoose } = require('mongoose');
const routes = require('./router')
const passport = require('passport');
require('dotenv').config();

const {
  passportVerifyToken, // USING
  passportVerifyAccount,
  passportConfigBasic,
} = require('./middlewares/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongodb connection

// // mongoose.connect('mongodb://localhost:27017/node-32-database');
// mongoose.connect('mongodb://127.0.0.1:27017/node-32-database');
mongoose.connect('mongodb+srv://saltymeatball:0zs2KQoCdUe8pAYY@cluster0.f1rylpl.mongodb.net/node-32-database');

passport.use(passportVerifyToken);
passport.use(passportVerifyAccount);
passport.use(passportConfigBasic);

// routers ...................................................
for(const route of routes) {
  app.use(route.path, route.validator , route.router )
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
