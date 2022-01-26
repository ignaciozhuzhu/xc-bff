var { GraphQLError, GraphQLList, GraphQLObjectType, GraphQLInt } = require('graphql');
let mysql = require('mysql');
let $conf = require('../conf/db');
let pool = mysql.createPool($conf.mysql);
let request = require('request');
const db = require('../dao/sequelize');
const requestPack = require('request');

async function searchSql($sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      connection.query($sql, params, function(err, result) {
        connection.release();
        if (err) {
          reject(err);
        }
        if (result && result.insertId) result.id = result.insertId;
        // console.log('result', result)
        resolve(result);
      });
    });
  });
}

function capAb(response, url, flag = 0) {
  let data;
  try {
    if (flag == 1) {
      data = JSON.parse(response.body);
    } else if (flag == 2) {
      data = [{ data: response.body }];
    } else {
      data = JSON.parse(response.body).data;
    }
    //console.log(11,response)
    return data;
  } catch (err) {
    console.log('JSON.parse error: ', response.statusCode, url, err, response.body);
    return [{ data: 0 }];
  }
}

async function searchByApi(source, api) {
  return new Promise((resolve, reject) => {
    let url = `http://yapi.smart-xwork.cn/mock/129669/orderList`;
    request(
      {
        url: url,
        method: 'GET',
        rejectUnauthorized: false,
        requestCert: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
         // Cookie: `JSESSIONID=${source.JSESSIONID};`,
        },
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let data;
          data = capAb(response, url);
          let arr = [];
          // if (data && !data.length) {
          //   arr.push(data);
          //   data = arr;
          // }
          console.log('data', data);
          resolve(data);
        } else {
          console.log('failure', response ? response.statusCode : ' :none', error, url);
          reject(response ? response.body : 'error');
        }
      }
    );
  });
}


//***************左侧统计4个指标结束*****************************************

//数组元素去重
function unique(array) {
  let obj = {};
  return array.filter(function(item, index, array) {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true);
  });
}

//是否已登录判断
function isLogin(source) {
  if (source && source.islogin) return true;
  else return false;
}

const ErrorConstructor = new GraphQLError({
  name: 'ErrorConstructor',
  description: '未登录',
  fields: () => {
    return {
      message: string,
    };
  },
});

function sleep(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 验证float格式
function checkFloat(num, decimalCount = 2) {
  try {
    const value = Number(num).toFixed(decimalCount);
    return new RegExp('^\\d*\\.\\d{' + decimalCount + '}$').test(String(value))
      ? Number(value)
      : false;
  } catch (error) {
    return false;
  }
}

// 数据库字段进行base64加密
function encrypt(str = '') {
  try {
    str = str === null ? '' : str;
    if (typeof str !== 'string') {
      str = String(str);
    }
    return Buffer.from(str).toString('base64');
  } catch (error) {
    console.error('加密失败:', str);
    throw error;
  }
}

// 数据库字段进行base64解密
function decode(str) {
  try {
    if (typeof str !== 'string') {
      str = String(str);
    }
    return Buffer.from(str, 'base64').toString('utf8');
  } catch (error) {
    console.error('解密失败:', str);
    throw error;
  }
}

/**
 * 验证是否有效的电子邮箱地址
 * @param {string} text
 * @return {boolean}
 */
const isEmail = text =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    text
  );

/**
 * 验证是否有效的11位手机号
 * @param {string} text
 * @return {boolean}
 */
const isPhone = text => /^1\d{10}$/.test(text);

/**
 * 执行事务操作
 * @param {function(Transaction)=>Promise.<void>} transaction `async (t: sequelize.Transaction) => void`
 * @param {object} [options]
 * @param {number} [options.retry] default to 0
 */
const transaction = async (transaction, options) => {
  // Read options
  let retry = Number(options && options.retry) || 0;
  if (retry < 0 || retry > 100) {
    retry = 0;
  }

  let tryCount = 0;
  let error;

  do {
    const t = await db.transaction();
    try {
      tryCount++;
      const result = await transaction(t);
      await t.commit();
      return result;
    } catch (err) {
      await t.rollback();
      error = err;
    }
  } while (tryCount <= retry);

  throw error;
};

const getSchemaByName = (data, key) => {
  for (let i in data) {
    if (data[i].key == key) {
      let res = data[i]; //.value
      // console.log(res, key)
      return res;
    }
  }
  return {};
  console.error('operationName none: ' + key + '.');
};

/** 解析page参数 */
const parsePage = param => Number(param) || 1;
/** 解析pageSize参数 */
const parsePageSize = param => Math.min(100, Number(param) || 20);

const getPaginationData = v => {
  const ObjectData = new GraphQLObjectType({
    name: v.toString() + 'Page',
    fields: () => {
      return {
        page: { type: GraphQLInt },
        pageSize: { type: GraphQLInt },
        total: { type: GraphQLInt },
        items: { type: new GraphQLList(v) },
      };
    },
  });
  return ObjectData;
};

const isValue=(value)=>{
  return value!==undefined&&value!=='undefined'&&value!=='null' &&value!==''//
}

const NumFillZero=(v)=>{
  let newId
  if(v<10)
    newId=`00${v+1}`
  else if(v<100)
    newId=`0${v+1}`
  else if(v<1000)
    newId=`${v+1}`
  return newId
}

module.exports = {
  searchByApi,
  searchSql,
  isLogin,
  ErrorConstructor,
  sleep,
  checkFloat,
  encrypt,
  decode,
  isEmail,
  isPhone,
  transaction,
  getSchemaByName,
  parsePage,
  parsePageSize,
  getPaginationData,
  isValue,
  NumFillZero,
};
