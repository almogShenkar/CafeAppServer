
var mysql = require('mysql');
var connection = mysql.createConnection({
        //dev env
        //host: "localhost",
        //adam  port: "8889",
        //user: "root",
        //prod env
        host:"us-cdbr-iron-east-04.cleardb.net",
        user:"b6295e767bfea4",
        password:"4049d2f6",
        database: "heroku_ee97203c1d832f5",
        timezone: 'utc'  //<-here this line was missing
        
      });


connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  


module.exports = connection;

