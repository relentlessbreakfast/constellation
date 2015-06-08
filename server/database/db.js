/*
* @Author: kuychaco
* @Date:   2015-05-28 15:33:28
* @Last Modified by:   justinwebb
*/

'use strict';
var dbClient = function () {
  var pg = require('pg');
  var bluebird = require('bluebird');
  var fs = require('fs');
  var config = require('../../build-config');

  // create constellation database
  // var cnx = "postgres://root:root@localhost/constellation";
  var cnx = process.env.DATABASE_URL || 'postgres://localhost:5432/constellation';
  var schemaUrl = config.db +'/postgres-schema.sql';
  // TODO: explore client pooling ###########
  // connect a single client to a postgres instance and use to
  // interact with the database

  /* * * * * PROMISIFIED USING JOIN * * * * */
  var client = bluebird.promisifyAll(new pg.Client(cnx));
  var connectP = client.connectAsync();
  var readFileP = bluebird.promisify(fs.readFile)(schemaUrl, 'utf8');

  bluebird.join(connectP, readFileP, function(dbInfo, schema) {
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

  return client;
};

module.exports = dbClient();

