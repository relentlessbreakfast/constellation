/*
* @Author: kuychaco
* @Date:   2015-06-03 10:20:55
* @Last Modified by:   kuychaco
*/

'use strict';


var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var pg = Promise.promisifyAll(require('pg'));
var config = require('../../build-config');

var conString = "postgres://localhost:5432/constellation";

// Connect to database --> promise with value sqlClient
var pSqlClient = pg.connectAsync(conString).spread(function(sqlClient, done) {
  sqlClient.close = done;
  return sqlClient;
});

// Read schema file --> promise with value schema-file
var schemaPromise = fs.readFileAsync(config.db+'/postgres-schema.sql', 'utf8');

// This is a helper function to close database connection
var closeConnection = function() {
  if (pSqlClient.isFulfilled()) {
    pSqlClient.value().close();
  }
};

// Load database schema
var loadSchema = function(callback) {
  Promise.join(pSqlClient, schemaPromise, function(sqlClient, schema) {
    return sqlClient.queryAsync(schema).thenReturn(schema);
  })
  .then(function(result) {
    callback(null, 'database schema loaded');
  })
  .catch(function(err) {
    callback(err, null);
  })
  .finally(function() {
    closeConnection();
  });
};

// Add users of repo to database
var postUsers = function(users, callback) {

  pSqlClient
    .then(function(sqlClient) {
      var query = "INSERT INTO users (id, login, avatar_url, url, html_url, organizations_url, repos_url, name, email, created_at, updated_at) VALUES (0, 'unassigned', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'),";
      users.forEach(function(user, i) {
        query += "(" + user.id + ", '" + user.login + "', '" + user.avatar_url + "', '" + user.url + "', '" + user.html_url + "', '" + user.organizations_url + "', '" + user.repos_url + "', '" + user.name + "', '" + user.email + "', '" + user.created_at + "', '" + user.updated_at + "')";
        if (i !== users.length-1) {
          query += ", ";
        } else {
          query += ";";
        }
      });

      return sqlClient.queryAsync(query).thenReturn(query);
    })
    .then(function(query) {
      callback(null, 'successfully added users');
    })
    .catch(function(err) {
      callback(err, null);
    });
};

// // Add labels for repo to database
// // TODO: Refactor and add for post-MVP
// var postLabels = function(labels) {


//   pSqlClient
//     .then(function(sqlClient) {
//       var query = 'INSERT INTO labels (url, name, color) VALUES ';
//       labels.forEach(function(label, i) {
//         query += "('" + label.url + "', '" + label.name + "', '" + label.color + "')";
//         if (i !== labels.length-1) {
//           query += ", ";
//         } else {
//           query += ";";
//         }
//       });

//       // console.log(query);

//       return sqlClient.queryAsync(query).thenReturn(query);
//     })
//     .then(function(query) {
//       console.log('successfully ran query to add users');
//     })
//     .catch(function(err) {
//       console.error('error adding labels:', err.message);
//     })
//     .finally(function() {
//       if (pSqlClient.isFulfilled()) {
//         // close database connection
//         pSqlClient.value().close();
//       }
//     });
// };

// Set up project - add clusters and nodes for root, entry, and exit to database
var createProjectBase = function(callback) {
  pSqlClient
    .then(function(sqlClient) {
      var queryAddRootCluster = "INSERT INTO clusters_entries_exits (id, abbrev, name, description, endpoints, creator) VALUES (DEFAULT, 'ROOT', 'Project Root', 'cluster of entire project', ARRAY[2,3], 0), (DEFAULT, 'placeholder', 'entry node for cluster id=1', DEFAULT, DEFAULT, DEFAULT), (DEFAULT, 'placeholder', 'exit node for cluster id=1', DEFAULT, DEFAULT, DEFAULT);";

      return sqlClient.queryAsync(queryAddRootCluster).thenReturn([queryAddRootCluster, sqlClient]);
    })
    .spread(function(query, sqlClient) {
      // console.log(query);
      var queryAddRootNodes = "INSERT INTO nodes (id, type, parent_cluster, cluster_id, issue_id) VALUES (1, 'cluster', DEFAULT, 1, DEFAULT), (2, 'enter', 1, DEFAULT, DEFAULT), (3, 'exit', 1, DEFAULT, DEFAULT);";
      return sqlClient.queryAsync(queryAddRootNodes).thenReturn(queryAddRootNodes);
    })
    .then(function(query) {
      // console.log(query);
      callback(null, 'successfully created project root clusters and nodes');
    })
    .catch(function(err) {
      callback(err, null);
    });
};

// Add issues to database
var postIssues = function(issues, callback) {

  pSqlClient
    .then(function(sqlClient) {
      var queryAddIssue = 'INSERT INTO issues (id, url, labels_url, comments_url, events_url, html_url, number_github, title, creator, state, locked, assignee, comments, created_at, updated_at, closed_at, body) VALUES ';
      issues.forEach(function(issue, i) {
        issue.assignee = issue.assignee || {id: 0};

        queryAddIssue += "('" + issue.id + "', '" + issue.url + "', '" + issue.labels_url + "', '" + issue.comments_url + "', '" + issue.events_url + "', '" + issue.html_url + "', '" + issue.number + "', '" + issue.title + "', " + issue.user.id + ", '" + issue.state + "', '" + issue.locked + "', " + issue.assignee.id + ", '" + issue.comments + "', '" + issue.created_at + "', '" + issue.updated_at + "', '" + issue.closed_at + "', '" + issue.body + "')";


        if (i !== issues.length-1) {
          queryAddIssue += ", ";
        } else {
          queryAddIssue += ";";
        }
      });


      return sqlClient.queryAsync(queryAddIssue).thenReturn(queryAddIssue);
    })
    .then(function(query) {
      callback(null, 'successfully added issues');
    })
    .catch(function(err) {
      callback(err, null);
    });
};

// Retrieve list of issue IDs for creating nodes
var getIssueIds = function(callback) {
  pSqlClient
    .then(function(sqlClient) {
      var query = 'SELECT id FROM issues';
      return sqlClient.queryAsync(query);
    })
    .then(function(results) {
      callback(null, results);
    })
    .catch(function(err) {
      callback(err, null);
    });
};

// Create node for each issue
var createIssueNodes = function(issues, callback) {

  pSqlClient
    .then(function(sqlClient) {

      var queryAddNode = 'INSERT INTO nodes (id, type, parent_cluster, issue_id) VALUES ';
      issues.forEach(function(issue, i) {
        queryAddNode += "(" + issue.id + ", 'issue', 1, " + issue.id + ")";

        if (i !== issues.length-1) {
          queryAddNode += ", ";
        } else {
          queryAddNode += ";";
        }
      });
      return sqlClient.queryAsync(queryAddNode).thenReturn(queryAddNode);

    })
    .then(function(/*query*/) {
      callback(null, 'successfully created nodes for issues');
    })
    .catch(function(err) {
      callback(err, null);
    });
};

module.exports.loadSchema = loadSchema;
module.exports.postUsers = postUsers;
// module.exports.postLabels = postLabels;
module.exports.createProjectBase = createProjectBase;
module.exports.postIssues = postIssues;
module.exports.closeConnection = closeConnection;
module.exports.getIssueIds = getIssueIds;
module.exports.createIssueNodes = createIssueNodes;
