'use strict';

const Sequelize = require('sequelize');
const dbConfig = require('../conf/db').mysql;

console.log(`Database using: mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  timezone: '+08:00',
  pool: {
    max: 100,
    min: 1,
    idle: 20000,
    acquire: 1000,
    evict: 40000,
  },
  logging: false
});
sequelize.op = Sequelize.Op;
module.exports = sequelize; 
