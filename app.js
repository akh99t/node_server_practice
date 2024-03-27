var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 跨域
const cors = require('cors');
// 设置seesion, 并且存储在数据库
const session = require('express-session')
const MongoStore = require('connect-mongo')
// https请求
// const https = require('https')

var app = express();

// 支持所有跨域
app.use(cors())
// 设置 seesion 中间件
app.use(session({
  name: 'sid', // cookie的name
  secret: 'akh999', // 加盐
  saveUninitialized: false, // 是否每次请求都设置一个cookie用于存储session的id
  resave: true, // 是否每次请求都重新保存session
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/usersList'
  }),
  cookie: {
    // secure: false, // 允许在非安全连接上设置 Cookie 有安全风险
    // sameSite: 'None',
    httpOnly: true, // 开启后前端js无法操作
    maxAge: 1000 * 60 * 60 * 6, // 控制sessionID的过期时间
  }
}))

// 设置允许跨域访问的源为 http://127.0.0.1
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置路由
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const openAiRouter = require('./routes/openAi');
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/openAI', openAiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;