/* 
* @Author: justinwebb
* @Date:   2015-05-28 22:46:32
* @Last Modified by:   cwhwang1986
*
* ----------------------------
* Create application
* Add middleware
* Start server
* ----------------------------
*/

'use strict';
try {
    require('dotenv').load();
} catch (err) {
  console.log('[server] .env file not available:', err);
  console.log('[server] loading production server environment variables');
}

var express = require('express');
// Create express application, app is a callback that handles requests
var app = express();

// Import router
var router = require('./routes/routes');

var config = require('./server-config');
var utils = require('../lib/utils');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');

// Set up database
require('./database/db');

// Enable CORS requests (browsersync proxy and github api)
app.use(cors());

// Get data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content for the app
app.use(express.static(config.dist));

// Register routes, all routes will be prefixed by '/api'
app.use('/api', router);

// Create node server
var server = http.createServer(app);

// Start server
server.listen(config.port, function () {
  var port = server.address().port;
  var project = utils.grandParentDir(__dirname, true);
  console.log(project + ' is online at http://localhost:'+port,
    'on ' + process.env.NODE_ENV + ' server...');

  console.log('[server] Dist:', config.dist);
});

