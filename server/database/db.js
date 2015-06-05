/*
* @Author: kuychaco
* @Date:   2015-05-28 15:33:28
* @Last Modified by:   justinwebb
*/

'use strict';

var config = require('../../build-config');

var pg = require('pg');

var Promise = require('bluebird');
var fs = require('fs');
// var readFile = Promise.promisify(require('fs').readFile);

// create constellation database
// var conString = "postgres://root:root@localhost/constellation";
var conString = "postgres://localhost:5432/constellation";
// TODO: explore client pooling ###########
// connect a single client to a postgres instance and use to interact with the database

/* * * * * PROMISIFIED USING JOIN * * * * */
var client = Promise.promisifyAll(new pg.Client(conString));

var connectP = client.connectAsync();
var readFileP = Promise.promisify(fs.readFile)(config.db+'/postgres-schema.sql', 'utf8');

Promise.join(connectP, readFileP,
  function(dbInfo, schema) {
    return client.queryAsync(schema);
  })
  .then(function() {
    console.log('Database schema loaded');
  })
  .catch(function(err) {
    console.error(err.message);
  })
  .finally(function() {
    // close database connection
    client.endAsync();
  });
/* * * * * * * * * * * * * * * * * * * * */

module.exports.client = client;

