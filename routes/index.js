var express = require('express');
var router = express.Router();
var { getServer } = require('../conf/db')

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  if (req.cookies.islogin) {
    req.session.islogin = req.cookies.islogin;
  }
  if (req.session.islogin) {
    res.locals.islogin = req.session.islogin;
  }
  res.render('index', { title: '主页', test: res.locals.islogin, server: getServer });
});
router.get('/queryAll', function (req, res, next) {
  userDao.queryAll(req, res, next);
});
module.exports = router;