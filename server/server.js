/* 
* @Author: justinwebb
* @Date:   2015-05-28 22:46:32
* @Last Modified by:   Justin Webb
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
var fs = require('fs');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
// var crypto = require('crypto');
var router = require('./routes/routes');
var config = require('./server-config');
var utils = require('../lib/utils');
var app = express();
var server = null;
// var credentials = null;


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
app.use(router);




// Create and start node server
if (process.env.NODE_ENV === 'development') {
  var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  var ssl = {
    key: fs.readFileSync(path.join(home, process.env.SSL_DIR, 'key.pem')),
    cert: fs.readFileSync(path.join(home, process.env.SSL_DIR, 'cert.pem')),
    requestCert: false,
    rejectUnauthorized: false
  };
  server = https.createServer(ssl, app);
} else {
  server = http.createServer(app);
}
server.listen(config.port, function () {
  var port = server.address().port;
  var project = utils.grandParentDir(__dirname, true);

  console.log(project + ' is online at https://localhost:'+port,
    'on '+ process.env.NODE_ENV +' server...');
  console.log('[server] Dist:', config.dist);

  // console.log('[server]', arguments);
});

