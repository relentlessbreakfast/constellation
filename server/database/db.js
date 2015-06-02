/*
* @Author: kuychaco
* @Date:   2015-05-28 15:33:28
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-01 23:06:42
*/

'use strict';

var config = require('../../build-config');

var pg = require('pg');

var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);

// create constellation database
// var conString = "postgres://root:root@localhost/constellation";
var conString = "postgres://localhost:5432/constellation";

// TODO: explore client pooling ###########
// connect a single client to a postgres instance and use to interact with the database
var client = Promise.promisifyAll(new pg.Client(conString));

var schema;
readFile(config.db+'/postgres-schema.sql', 'utf8')
  .then(function(schemaFile) {
    schema = schemaFile;
    // establish connection to database
    return client.connectAsync();
  })
  .catch(function(err) {
    console.error('could not read schema file', err);
  })
  .then(function() {
    // load database schema
    return client.queryAsync(schema);
  })
  .catch(function(err) {
    console.error('could not connect to postgres', err);
  })
  .then(function(result) {
    console.log('Databse schema loaded');
  })
  .catch(function(err) {
    console.error('error loading schema', err);
  })
  .finally(function() {
    // close connection
    client.endAsync();
  });

module.exports = client;
