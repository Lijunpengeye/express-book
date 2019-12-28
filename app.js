var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { SuccessModel, ErrorModel } = require('./model/resModel');
const { jwtAuth } = require('./utils/index');
const bookRouter = require('./routes/book');
const commonRouter = require('./routes/common');
const bannerRouter = require('./routes/banner');
const cors = require('cors')

var app = express();
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
  console.log(err)
  if (err.status == 401) {
    res.json(
      new ErrorModel({}, 'token失效，请重新登录！', 401)
    )
  }
});
app.get('/public/upload/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
  console.log("Request for " + req.url + " received.");
})

app.use('/', indexRouter);
app.use('/common', commonRouter)
app.use('/users', usersRouter);
app.use('/book', bookRouter)
app.use('/banner', bannerRouter)


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
