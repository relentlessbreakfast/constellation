/*
* @Author: kuychaco
* @Date:   2015-06-03 10:20:55
* @Last Modified by:   kuychaco
*/

'use strict';

var config = require('../../build-config');
var pg = require('pg');
// var client = require('./db').client;
var Github = require('github');
var http = require('http');

var Promise = require('bluebird');
var conString = "postgres://localhost:5432/constellation";


var client = Promise.promisifyAll(new pg.Client(conString));
