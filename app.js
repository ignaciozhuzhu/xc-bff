var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('./log4js.js');
const axios = require('axios');

var index = require('./routes/index');
var util = require('./util/util');

var router = express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//登录 注册 权限相关 begin

var session = require('express-session');
var cookieParser = require('cookie-parser');
var usr = require('./dao/dbConnect');

//graphql definition bg
var graphqlHTTP = require('express-graphql');

var configSchema = require('./graphql/xc/config/schema');
var stockSchema = require('./graphql/xc/stock/schema');

const requestPack = require('request');

//加入日志文件
log4js.use(app);

app.use('/', index);
//app.use('/users', users);

//******************************

app.use('/static', express.static('public'));
app.use('/', express.static('public'));

app.get('/logout', function(req, res) {
  res.clearCookie('connect.sid');
  res.clearCookie('islogin');
  req.session.destroy();
  res.redirect('/login');
});

app.get('/home', function(req, res) {
  if (req.session.islogin) {
    res.locals.islogin = req.session.islogin;
  }
  if (req.cookies.islogin) {
    req.session.islogin = req.cookies.islogin;
  }
  res.render('home', { title: 'Home', user: res.locals.islogin });
});

const schemas = [
  { key: 'config', value: configSchema, build: false },
  { key: 'stock', value: stockSchema, build: false },
];

app.use(
  session({
    secret: 'lhx',
    cookie: { maxAge: 7200 * 1000 }, //两个小时
    resave: false,
    saveUninitialized: false,
  })
);

const getGraphqlData = request => {
  const operationName = request.body.operationName;
  let schemaOb = util.getSchemaByName(schemas, operationName || 'stock'); //默认值带文档
  let rootValue = {
    token: request.session.access_token,
  };
  let rootValueCombine;
  let schema;
  if (schemaOb.build) { //判断是否需要联合schema
    rootValueCombine = Object.assign(rootValue, schemaOb.value.root);
    schema = schemaOb.value.schema;
  } else {
    rootValueCombine = rootValue;
    schema = schemaOb.value;
  }
  return {
    schema: schema,
    rootValue: rootValueCombine,
    graphiql: true, //启用GraphiQL
  };
};

//接收客户端query schema名传递
https: app.use(
  '/graphql',
  graphqlHTTP(request => {
    console.log('初始的', request.session);

    return getGraphqlData(request);
  })
);


/////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
