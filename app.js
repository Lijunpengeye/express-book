var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// admin 路由
const indexRouterAdmin = require('./routesAdmin/index');
const usersRouterAdmin = require('./routesAdmin/user');
const bookRouterAdmin = require('./routesAdmin/book');
const commonRouterAdmin = require('./routesAdmin/common');
const bannerRouterAdmin = require('./routesAdmin/banner');

// wab 路由
const indexRouterWab = require('./routesWab/index');
const bookRouterWab = require('./routesWab/book');
const userRouterWab = require('./routesWab/user');


const { SuccessModel, ErrorModel } = require('./model/resModel');
const { jwtAuth } = require('./utils/index');
const cors = require('cors')

var app = express();
global.SuccessModel = SuccessModel
global.ErrorModel = ErrorModel
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(jwtAuth)
app.use(function (err, req, res, next) {
  if (err.status == 401) {
    res.json(
      new this.ErrorModel({}, '请登录！', 401)
    )
  }
});
app.get('/public/upload/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
  console.log("Request for " + req.url + " received.");
})

// 后台路由
app.use('/', indexRouterAdmin);
app.use('/common', commonRouterAdmin)
app.use('/users', usersRouterAdmin);
app.use('/book', bookRouterAdmin)
app.use('/banner', bannerRouterAdmin)


// wab路由
app.use('/wab/index', indexRouterWab);
app.use('/wab/book', bookRouterWab);
app.use('/wab/user', userRouterWab);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
