/* 
* @Author: justinwebb
* @Date:   2015-05-28 22:46:32
* @Last Modified by:   kuychaco
*/

'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var router = require('./routes');
var config = require('./server-config');
var utils = require('../lib/utils');
var db = require('./database/db');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(config.dist));

server.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  var project = utils.grandParentDir(__dirname, true);
  console.log(project + ' is online at http://localhost:'+port, host, port);
  // console.log(project + ' is online at http://%s:%s', host, port);
  console.log('Created client to', db.database, 'database');
});

// Register routes
// all routes will be prefixed by /api
app.use('/api', router);

module.exports.router = router;