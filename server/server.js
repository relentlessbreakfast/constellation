/* 
* @Author: justinwebb
* @Date:   2015-05-28 22:46:32
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-05-29 00:23:54
*/

'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('./server-config');
var utils = require('../lib/utils');

app.use(express.static(config.dist));

server.listen(config.port, function () {
  var project = utils.grandParentDir(__dirname);
  console.log(project + ' is online at http://localhost:%d', config.port);
});
