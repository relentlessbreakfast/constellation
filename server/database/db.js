/*
* @Author: kuychaco
* @Date:   2015-05-28 15:33:28
* @Last Modified by:   kuychaco
*/

'use strict';


var Bluebird = require('bluebird');

var data = require('./data-stubs');
var controller = Bluebird.promisifyAll(require('./db-import'));


// Load schema into database
controller.loadSchemaAsync()
// Load users into database
.then(function(result) {
  console.log(result);
  return controller.postUsersAsync(data.users);
})
// Create project root clusters and nodes
.then(function(result) {
  console.log(result);
  return controller.createProjectBaseAsync(data.clusters);
})
// Add issues to database
.then(function(result) {
  console.log(result);
  return controller.postIssuesAsync(data.issues);
})
// Get list of issue ids
.then(function(result) {
  console.log(result);
  return controller.getIssueIdsAsync();
})
// Add node for each github issue
.then(function(result) {
  console.log('successfully retrieved list of issue IDs');
  return controller.createIssueNodesAsync(result.rows);
})
// Verify that nodes were created
.then(function(result) {
  console.log(result);
})
// Log any errors that occur
.catch(function(err) {
  console.error(err.message);
})
// Close the database connection
.finally(function() {
  controller.closeConnection();
});

