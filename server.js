
// Get dependencies
const log4js=require('log4js');
const logConfig= require('./utils/logConfig');
const logger = log4js.getLogger('cafeappserver');
logger.trace("XXXXXX");
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var scheduler = require('./utils/scheduler');
//var scheduler = require('./scheduler2');
const cors = require('cors');

//Init app
const app = express();



scheduler.ctor();

var minutes = 5, the_interval = minutes * 60 * 1000;
//setInterval(scheduler.clearSlots,the_interval);

//Set static folder
app.use(express.static(__dirname+'/../images'));
app.use(fileUpload());

console.log(__dirname);


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    credentials: true
}));


// Set server port
const port = process.env.PORT || 3000;
app.set('port', port);




// Set our api routes
app.use('/api/users', require('./api/users'));
app.use('/api/suppliers', require('./api/suppliers'));
app.use('/api/shifts', require('./api/shifts'));
app.use('/api/reviews', require('./api/reviews'));
app.use('/api/reviewlists', require('./api/reviewlists'));
app.use('/api/queries', require('./api/queries'));
app.use('/api/orderedlist', require('./api/orderedlist'));
app.use('/api/ordereditems', require('./api/ordereditems'));
app.use('/api/items', require('./api/items'));
app.use('/api/files', require('./api/files'));
app.use('/api/employees', require('./api/employees'));



app.set('tz', 'GMT+2');


// Create http server
const server = http.createServer(app);

// Start listening to requests
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
