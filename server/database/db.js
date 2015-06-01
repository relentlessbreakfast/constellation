/*
* @Author: kuychaco
* @Date:   2015-05-28 15:33:28
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-01 11:55:32
*/

'use strict';

var pg = require('pg');
var fs = require('fs');

// var conString = "postgres://root:root@localhost/constellation";
// create constellation database
var conString = "postgres://localhost:5432/constellation";

// TODO: explore client pooling ###########
// connect a single client to a postgres instance, run some queries, and disconnect
var client = new pg.Client(conString);

fs.readFile('/Users/kuychaco/Engineering/Constellation/constellation/server/database/postgres-schema.sql', {encoding: 'utf8'}, function(err, schema) {
  if (err) {
    return console.error('could not read schema file', err);
  }
  client.connect(function(err) {
    if (err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(schema, function(err, result) {
      if (err) {
        return console.error('error loading schema', err);
      }
      client.end();
    });
  });
});
