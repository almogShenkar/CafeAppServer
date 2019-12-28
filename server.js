/**
 * CafeApp server -  by Almog Solan
 * Written in node.js using express
 * Shenkar 2018 Final Project
 * This file is the project entry-point
 * RestFul API 
 */


//app required modules
const log4js=require('log4js');
const logConfig= require('./utils/logConfig');
const loggerHeroku = require('heroku-logger');
const logger = log4js.getLogger('cafeappserver');
const errHandlerBluePrint = require('./utils/errHandler');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
const cors = require('cors');


loggerHeroku.info("Server is starting");
logger.info("Server is starting");

//Init app
let app = express();

//Create errHndler instance
let errHandler=new errHandlerBluePrint();

//Set files static folder
app.use(express.static(__dirname+'/../images'));
//Json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//File upload support
app.use(fileUpload());
//Set server config
app.set('port', port);
app.set('tz', 'GMT+2');
app.set('secretvar', "cafeappsecretvar"); // secret variable

//app middleware of cafeappserver core objects
app.use('/api',require('./api/auth'));
app.use('/api/users', require('./api/users'));
app.use('/api/suppliers', require('./api/suppliers'));
app.use('/api/shifts', require('./api/shifts'));
app.use('/api/reviews', require('./api/reviews'));
app.use('/api/reviewlists', require('./api/reviewlists'));
app.use('/api/query', require('./api/queries'));
app.use('/api/orderedlist', require('./api/orderedlist'));
app.use('/api/items', require('./api/items'));
app.use('/api/', require('./api/files'));
app.use('/api/ordereditems', require('./api/ordereditem'));
app.use(errHandler.writeErr);
//end of core middleware

//just print somthing on first page
app.get('/', (req, res)=>{
    res.send('Welcome to cafeappserver!');
  });


// Create http server
const server = http.createServer(app);

// Start listening to requests
server.listen(port, () => {
  console.log(`Listening on port:${port}`);logger.info(`Listening on port:${port}`);
});





