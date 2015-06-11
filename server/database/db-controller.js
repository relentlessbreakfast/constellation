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

// Helper function to post clusters
var updateClusters = function(clusters) {

};

// Helper function to post issues
var updateIssues = function(issues) {

};

// Helper function to update nodes
var updateNodes = function(nodes) {
  return Bluebird.map(nodes, function(node) {

  });
};

// Helper function to delete nodes
var deleteNodes = function(nodes) {
  // parameter is array of nodeIds

  // delete deleted nodes
  deleted.forEach(function(nodeId) {
    // delete node from database and corresponding issue, cluster, entry/exit nodes
    // if node is cluster
      // delete corresponding entry and exit nodes
      // delete corresponding cluster
      // find all child nodes and set parent_cluster to 0
      // delete node
    // if node is issue
      // delete correspnding issue
      // delete node
  });
};

// Helper function to delete issues
var deleteIssues = function(issues) {


};

// Helper function to delete clusters
var deleteClusters = function(clusters) {
  // parameter is array of

};

// Update database to store changes made to graph
var postGraph = function(graph, callback) {

  var nodes = [];
  var clusters = [];
  var issues = [];
  var deleted = graph.deleted;

  // iterate through all nodes
  Object.keys(graph).forEach(function(key) {
    var node = graph[key];
    if (node.constructor === Object) {
      if (node.type === 'cluster') {
        clusters.push(node.cluster);
        delete node.cluster;
      } else if (node.type === 'issue') {
        issues.push(node.issue);
        delete node.issue;
      }
      nodes.push(node);
    }
  });



  // post to nodes
  console.log('NODES', nodes);
  console.log('CLUSTERS', clusters);
  console.log('ISSUES', issues);

  Bluebird.map([updateNodes(nodes), deleteNodes(deleted)], function(test) {
    console.log('*****', test);
  });

  // if issue post to issues
  // if cluster post to clusters
};

module.exports.getGraph = getGraph;
module.exports.getCluster = getCluster;
module.exports.getIssue = getIssue;
module.exports.closeConnection = closeConnection;
module.exports.postGraph = postGraph;