/* 
* @Author: justinwebb
* @Date:   2015-05-28 22:46:32
* @Last Modified by:   justinwebb
*/

'use strict';
require('dotenv').load();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var router = require('./routes/routes');
var config = require('./server-config');
var utils = require('../lib/utils');
require('./database/db');
var cors = require('cors');
var bodyParser = require('body-parser');

// Initialize application
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(config.dist));

// Start server
server.listen(config.port, function () {
  var port = server.address().port;
  var project = utils.grandParentDir(__dirname, true);
  console.log(project + ' is online at http://localhost:'+port,
    'on ' + process.env.NODE_ENV + ' server...');
});

// Register routes. All routes will be prefixed by '/api'
app.use('/api', router);

// Module entry point
module.exports.router = router;
