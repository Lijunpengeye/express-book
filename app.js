var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
const { SuccessModel, ErrorModel } = require('./model/resModel')
const expressJwt = require('express-jwt');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bookRouter = require('./routes/book');
const cors = require('cors')
const tokens = require('./utils/index')

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

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
app.use(tokens)
app.use(function (err, req, res, next) {
  console.log(err)
  if (err.status == 401) {
    res.json(
      new ErrorModel({}, 'token失效')
    )
  }
});

// const redisClient = require('./db/redis')
// const sessionStore = new RedisStore({
//   client: redisClient
// })
// app.use(session({
//   secret: 'WJiol#23123_',
//   cookie: {
//     // path: '/',   // 默认配置
//     // httpOnly: true,  // 默认配置
//     maxAge: 24 * 60 * 60 * 1000
//   },
//   store: sessionStore
// }))

app.get('/public/upload/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
  console.log("Request for " + req.url + " received.");
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter)


// catch 404 and forward to error handler
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
