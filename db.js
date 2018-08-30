/**
 * DB module- responsible for database config and connections
 */
let mysql = require('mysql');
const log4js=require('log4js');
const logConfig= require('./utils/logConfig');
const logger = log4js.getLogger('cafeappserver');
const loggerHeroku = require('heroku-logger');

let dbConfig={
  //dev env
  dbDevConfing : {
    host: "localhost",
    user: "root",
    database: "cafeapp",
    timezone: 'utc'
  },
  //production env
  dbProdConfing : {
    connectionLimit: 10,
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b6295e767bfea4",
    password: "4049d2f6",
    database: "heroku_ee97203c1d832f5",
    timezone: 'utc'
  }
}
let selectedConfig=dbConfig.dbProdConfing;
let pool = mysql.createPool(selectedConfig);

logger.info(`DB set to ${selectedConfig.database}`);
loggerHeroku.info(`DB set to ${selectedConfig.database}`);

pool.on('acquire', (connection)=> {
  logger.info('Connection %d acquired', connection.threadId);
});

pool.on('connection', (connection)=> {
  logger.info("Connected to db");
});

pool.on('release', (connection)=> {
  logger.info('Connection %d released', connection.threadId);
});


module.exports = pool;

