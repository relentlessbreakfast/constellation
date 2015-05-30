/* 
* @Author: justinwebb
* @Date:   2015-05-28 22:46:32
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-05-29 20:33:47
*/

'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('./server-config');
var utils = require('../lib/utils');

app.use(express.static(config.dist));

server.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  var project = utils.grandParentDir(__dirname, true);
  console.log(project + ' is online at http://localh:'+port, host, port);
  // console.log(project + ' is online at http://%s:%s', host, port);
});
