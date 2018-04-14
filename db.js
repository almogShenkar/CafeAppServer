
var mysql = require('mysql');
var connection = mysql.createConnection({
            host: "localhost",
            port: "8889",
            user: "root",
            password: "root",
            database: "cafeapp",
            socket: "/Applications/MAMP/tmp/mysql/mysql.sock"
      });


connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
    }
    console.log('Connection established');
  });



module.exports = connection;

