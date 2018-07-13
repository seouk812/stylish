/*
    [ 백엔드 구성 ]
    1. 사용자(계정관리 등등) 
    2. 서비스(물품 검색 등등)
    3. 관리자(고객 정보 관리)
*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const app = express();

// routes requires
let admin_router = require('./routes/admin');
let users_router = require('./routes/users');
let service_router = require('./routes/service');

// MongoDB connected
require('./database/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '@#@$SSR#@$#$',
  resave: false,
  saveUninitialized: true
}));

// routes set
app.use('/admin', admin_router);
app.use('/user', users_router);
app.use('/service', service_router);

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