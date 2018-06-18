
var mysql = require('mysql');

var dbDevConfing = {
  //dev env
  host: "localhost",
  user: "root",
  database: "cafeapp",
  timezone: 'utc'
};
var dbProdConfing = {
  //production env
  connectionLimit: 10,
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b6295e767bfea4",
  password: "4049d2f6",
  database: "heroku_ee97203c1d832f5",
  timezone: 'utc'
}
var pool = mysql.createPool(dbProdConfing);

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

