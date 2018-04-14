
var mysql = require('mysql');
var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "cafeapp"
      });


connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
    }
    console.log('Connection established');
  });



module.exports = connection;

