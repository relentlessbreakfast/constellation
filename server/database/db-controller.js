/*
* @Author: kuychaco
* @Date:   2015-06-03 10:20:55
* @Last Modified by:   justinwebb
*/

'use strict';



var dbUrl = process.env.DATABASE_URL;
var Bluebird = require('bluebird');
var pg = Bluebird.promisifyAll(require('pg'));
var dbPost = Bluebird.promisifyAll(require('./db-import'));
var data = require('./data-stubs');

// Connect to database --> promise with value sqlClient
var pSqlClient = pg.connectAsync(dbUrl).spread(function(sqlClient, done) {
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
      var query = 'SELECT * FROM nodes WHERE parent_cluster = ' + clusterId + ' OR cluster_id = ' + clusterId + ';';
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

// Helper function to update nodes
var updateNodes = function(nodes, callback) {
  return Bluebird.map(nodes, function(node) {
    return pSqlClient
      .then(function(sqlClient) {
        // update upstream and downstream arrays
        var upstream = node.upstream_nodes ? 'ARRAY['+node.upstream_nodes.toString()+']' : 'null';
        var downstream = node.downstream_nodes ? 'ARRAY['+node.downstream_nodes.toString()+']' : 'null';

        var query = 'UPDATE nodes SET (upstream_nodes, downstream_nodes) = (' + upstream + ', ' + downstream + ') WHERE id = ' + node.id + ';';
        return sqlClient.queryAsync(query);
      });
  });

};

var getChildrenNodes = function(clusters) {
  return Bluebird.map(clusters, function(clusterNodeId) {

    return pSqlClient
      .then(function(sqlClient) {
        // get all nodes with parent_cluster === clusterId
        var clusterId = '(SELECT cluster_id FROM nodes WHERE id = ' + clusterNodeId + ')';
        var query = 'SELECT id FROM nodes WHERE parent_cluster = ' + clusterId + ';';
        return sqlClient.queryAsync(query);
      })
      .then(function(results){
        var mappedResults = results.rows.map(function(row){
          return row.id;
        });
        return mappedResults;
      });
  })
  .then(function(results){
    // flatten array
    return results.reduce(function(result, array) {
      return result.concat(array);
    }, []);
  });
};

// Helper function to delete nodes
var deleteNodes = function(deletedNodeIds) {
  return getChildrenNodes(deletedNodeIds)
    .then(function(nodeIds) {
      deletedNodeIds = deletedNodeIds.concat(nodeIds);
      return Bluebird.map(deletedNodeIds, function(nodeId) {
        return pSqlClient
          .then(function(sqlClient) {
            // delete node
            var query = 'DELETE FROM nodes WHERE id = ' + nodeId + ';';
            return sqlClient.queryAsync(query);
          });
      });

    });

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

  return Bluebird.all([updateNodes(nodes), deleteNodes(deleted)])
    .then(function(test) {
      callback(null, 'graph successfully posted.');
    })
    .catch(function (err) {
      callback(err, null);
    });

};

var getAvatars = function(callback) {
  return pSqlClient
    .then(function(sqlClient) {

      var query = 'SELECT id, login, avatar_url, name FROM users WHERE NOT id = 0;';
      return sqlClient.queryAsync(query);
    })
    .then(function(results) {
      callback(null, results.rows);
    })
    .catch(function(err) {
      callback(err, null);
    });
};


// setTimeout(function(){postGraph(data.graph_removed_19, function(err, results){
//   if(err){
//     return console.log(err);
//   }
//   console.log('@@@@@@', results);
// });
// }, 6000);

module.exports.getGraph = getGraph;
module.exports.getCluster = getCluster;
module.exports.getIssue = getIssue;
module.exports.closeConnection = closeConnection;
module.exports.postGraph = postGraph;
module.exports.getAvatars = getAvatars;
