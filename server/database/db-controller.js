/*
* @Author: kuychaco
* @Date:   2015-06-03 10:20:55
* @Last Modified by:   kuychaco
*/

'use strict';



var Bluebird = require('bluebird');
var pg = Bluebird.promisifyAll(require('pg'));
var dbPost = Bluebird.promisifyAll(require('./db-import'));

var conString = "postgres://localhost:5432/constellation";

// Connect to database --> promise with value sqlClient
var pSqlClient = pg.connectAsync(conString).spread(function(sqlClient, done) {
  sqlClient.close = done;
  return sqlClient;
});

// Helper function to close database connection
var closeConnection = function() {
  if (pSqlClient.isFulfilled()) {
    pSqlClient.value().close();
  }
};

// Helper function to get cluster object
var getCluster = function(clusterId) {
  var query = 'SELECT * from clusters WHERE id = ' + clusterId + ';';

  return pSqlClient
    .then(function(sqlClient) {
      return sqlClient.queryAsync(query);
    });
};

// Helper function to get issue object
var getIssue = function(issueId) {
  var query = 'SELECT * FROM issues WHERE id = ' + issueId + ';';

  return pSqlClient
    .then(function(sqlClient) {
      return sqlClient.queryAsync(query);
    });
};


// Helper function to create graph
var getGraph = function(clusterId, callback) {

  pSqlClient
    .then(function(sqlClient) {
      // get nodes with parent_cluster === clusterId or id === clusterId
      var query = 'SELECT * FROM nodes WHERE parent_cluster = ' + clusterId + ' OR id = ' + clusterId + ';';
      return sqlClient.queryAsync(query);
    })
    .then(function(results) {
      // create graph object
      var graph = {};
      graph.parent_cluster = clusterId;
      var clusters_and_issues = [];
      results.rows.forEach(function(node) {
        if (node.type === 'enter') {
          graph.enter = node.id;
          graph[node.id] = node;
        } else if (node.type === 'exit') {
          graph.exit = node.id;
          graph[node.id] = node;
        } else if (node.type === 'issue' || node.type === 'cluster') {
          graph[node.id] = node;
          clusters_and_issues.push(node);
        }
      });
      Bluebird.map(clusters_and_issues, function(node) {
        if (node.type === 'issue') {
          return getIssue(node.issue_id).then(function(result) {
            result = result.rows[0];
            graph[node.id].issue = result;
          });
        } else if (node.type === 'cluster') {
          return getCluster(node.cluster_id).then(function(result) {
            result = result.rows[0];
            graph[node.id].cluster = result;
          });
        }
      })
      .then(function() {
        graph.deleted = [];
        callback(null, graph);
      })
      .catch(function(err) {
        callback(err, null);
      });
    });

};

// Helper function to post cluster object
var updateClusters = function(clusters) {

};

// Helper function to post issue object
var updateIssues = function(issues, callback) {

};

var postGraph = function(graph, callback) {
  // delete deleted nodes
  // iterate through all nodes
    // post to nodes
    // if issue post to issues
    // if cluster post to clusters
};

module.exports.getGraph = getGraph;
module.exports.getCluster = getCluster;
module.exports.getIssue = getIssue;
module.exports.closeConnection = closeConnection;