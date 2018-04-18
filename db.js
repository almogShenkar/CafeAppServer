
var mysql = require('mysql');
var connection = mysql.createConnection({
        host: "localhost",
        //adam  port: "8889",
        user: "root",
        //adam  password: "root",
        password: "",
        database: "cafeapp"
        //adam socket: "/Applications/MAMP/tmp/mysql/mysql.sock"
      });


connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
    }
    console.log('Connection established');
  });



module.exports = connection;

