let mysql = require('mysql');
const log4js=require('log4js');
const logConfig= require('./utils/logConfig');
const logger = log4js.getLogger('cafeappserver');
const loggerHeroku = require('heroku-logger');


let dbDevConfing = {
  //dev env
  host: "localhost",
  user: "root",
  database: "cafeapp",
  timezone: 'utc'
};

let dbProdConfing = {
  //production env
  connectionLimit: 10,
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b6295e767bfea4",
  password: "4049d2f6",
  database: "heroku_ee97203c1d832f5",
  timezone: 'utc'
}

let pool = mysql.createPool(dbProdConfing);

logger.info("DB set to dbProdConfing");
loggerHeroku.info("DB set to dbProdConfing");

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  console.log("Connected to db");
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});


module.exports = pool;

