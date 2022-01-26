/**
 * Created by Administrator on 2017/8/11/011.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');

function connectServer() {
  var client = mysql.createConnection($conf.mysql);
  return client;
}

function updatePwd(client,username,newpwd,callback){
  // console.log(username,newpwd)
  console.log('update mc_user set password=to_base64("'+newpwd+'") where username=to_base64("'+username+'")')
  client.query('update mc_user set password=to_base64("'+newpwd+'") where username=to_base64("'+username+'")', function (err, results, fields) {
    if (err) throw err;
    callback(results);
  });
}

function selectFun(client, username, callback) {
  //client为一个mysql连接对象
  client.query('select password, isadmin from mc_user where username=to_base64("' + username + '")', function (err, results, fields) {
    if (err) throw err;
    callback(results);
  });
}

function insertFun(client, username, password, callback) {
  client.query('insert into mc_system_user value(0,?,?)', [username, password], function (err, result) {
    if (err) {
      console.log("error:" + err.message);
      return err;
    }
    callback(err);
  });
}

exports.connect = connectServer;
exports.selectFun = selectFun;
exports.insertFun = insertFun;
exports.updatePwd = updatePwd;
