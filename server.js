
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

//Init app
const app = express();



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
const port = 3000
app.set('port', port);

// Get our API routes
const api = require('./api');

// Set our api routes
app.use('/api', api);


// Create http server
const server = http.createServer(app);

// Start listening to requests
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));