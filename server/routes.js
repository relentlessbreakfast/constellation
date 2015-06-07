/*
* @Author: kuychaco
* @Date:   2015-06-03 11:57:45
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-06 15:56:10
*/

'use strict';

var dbController = require('./database/db-controller');
var express = require('express');
var router = express.Router();
var graph;
router.get('/', function(req, res) {
  res.json({message: 'welcome to our api!'});
});
router.get('/cluster/:cluster_id', function(req, res) {
  console.log('get request for cluster', req.params.cluster_id);

  if (req.params.cluster_id === '1') {
    graph = {
      entry: 2,
      parent_cluster: 1,
      1: {
        'id': 1, // PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': null, // foreign key ID from NODES table
        'cluster_id': {
          'id': 1,  // PRIMARY KEY
          'abbrev': 'ROOT',  // must be less than 32 chars
          'name': 'Project Root',
          'description': 'Cluster of entire project',
          'endpoints': [2, 3],  // these foreign key IDs for entries in NODES table
          'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [], // foreign key ID from NODES table
        'downstream_nodes': [] // foreign key ID from NODES table
      },
      2: {
        'id': 2,// PRIMARY KEY
        'type': 'entry',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': null, // foreign key ID from NODES table
        'downstream_nodes': [4,6] // foreign key ID from NODES table
      },
      3: {
        'id': 3,// PRIMARY KEY
        'type': 'exit',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [5,7], // foreign key ID from NODES table
        'downstream_nodes': [] // foreign key ID from NODES table
      },
      4: {
        'id': 4,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
          'id': 82639324,
          'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
          'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
          'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
          'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
          'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
          'number': 4,
          'title': 'Add O-auth',
          'user': 1445825,
          'labels': [1],
          'state': 'open',
          'locked': false,
          'assignee': 442978,
          'comments': 0,
          'created_at': '2015-05-30T00:16:35Z',
          'updated_at': '2015-05-30T00:44:37Z',
          'closed_at': null,
          'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
        }, // foreign key ID from ISSUES table
        'upstream_nodes': [2], // foreign key ID from NODES table
        'downstream_nodes': [5,7] // foreign key ID from NODES table
      },
      5: {
        'id': 5,// PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': {
          'id': 3,  // PRIMARY KEY
          'abbrev': 'Repo selection',  // must be less than 32 chars
          'name': 'Cluster-Repo Selection Screen',
          'description': 'Cluster of repo selection related tasks',
          'endpoints': [13, 14],  // these foreign key IDs for entries in NODES table
          'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [4,6], // foreign key ID from NODES table
        'downstream_nodes': [3] // foreign key ID from NODES table
      },
      6: {
        'id': 6,// PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': {
          'id': 2,  // PRIMARY KEY
          'abbrev': 'DB',  // must be less than 32 chars
          'name': 'Cluster-Database Schema',
          'description': 'Cluster of database schema related tasks',
          'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
          'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [2], // foreign key ID from NODES table
        'downstream_nodes': [5,7] // foreign key ID from NODES table
      },
      7: {
        'id': 7,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
          'id': 82639733, // PRIMARY KEY
          'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
          'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
          'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
          'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
          'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
          'number': 7,
          'title': 'Make sample graph data',
          'user': 1445825,
          'labels': [6],
          'state': 'open',
          'locked': false,
          'assignee': 1445825,
          'comments': 2,
          'created_at': '2015-05-30T00:18:26Z',
          'updated_at': '2015-05-30T00:43:54Z',
          'closed_at': null,
          'body': 'type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
        }, // foreign key ID from ISSUES table
        'upstream_nodes': [4,6], // foreign key ID from NODES table
        'downstream_nodes': [3] // foreign key ID from NODES table
      }
    };
    return res.json(graph);
  }
  else if (req.params.cluster_id === '5') {
    graph = {
      entry: 2,
      parent_cluster: 5,
      1: {
        'id': 1, // PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': 5, // foreign key ID from NODES table
        'cluster_id': {
          'id': 1,  // PRIMARY KEY
          'abbrev': 'ROOT',  // must be less than 32 chars
          'name': 'Project Root',
          'description': 'Cluster of entire project',
          'endpoints': [2, 3],  // these foreign key IDs for entries in NODES table
          'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [], // foreign key ID from NODES table
        'downstream_nodes': [] // foreign key ID from NODES table
      },
      2: {
        'id': 2,// PRIMARY KEY
        'type': 'entry',
        'parent_cluster': 5, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': null, // foreign key ID from NODES table
        'downstream_nodes': [4,6] // foreign key ID from NODES table
      },
      3: {
        'id': 3,// PRIMARY KEY
        'type': 'exit',
        'parent_cluster': 5, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [5,7], // foreign key ID from NODES table
        'downstream_nodes': [] // foreign key ID from NODES table
      },
      4: {
        'id': 4,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 5, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
          'id': 82639324,
          'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
          'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
          'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
          'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
          'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
          'number': 4,
          'title': 'Add O-auth',
          'user': 1445825,
          'labels': [1],
          'state': 'open',
          'locked': false,
          'assignee': 442978,
          'comments': 0,
          'created_at': '2015-05-30T00:16:35Z',
          'updated_at': '2015-05-30T00:44:37Z',
          'closed_at': null,
          'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
        }, // foreign key ID from ISSUES table
        'upstream_nodes': [2], // foreign key ID from NODES table
        'downstream_nodes': [5,7] // foreign key ID from NODES table
      },
      5: {
        'id': 5,// PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': {
          'id': 3,  // PRIMARY KEY
          'abbrev': 'Repo selection',  // must be less than 32 chars
          'name': 'Cluster-Repo Selection Screen',
          'description': 'Cluster of repo selection related tasks',
          'endpoints': [13, 14],  // these foreign key IDs for entries in NODES table
          'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [4,6], // foreign key ID from NODES table
        'downstream_nodes': [3] // foreign key ID from NODES table
      },
      6: {
        'id': 6,// PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': 5, // foreign key ID from NODES table
        'cluster_id': {
          'id': 2,  // PRIMARY KEY
          'abbrev': 'DB',  // must be less than 32 chars
          'name': 'Cluster-Database Schema',
          'description': 'Cluster of database schema related tasks',
          'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
          'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [2], // foreign key ID from NODES table
        'downstream_nodes': [5,7] // foreign key ID from NODES table
      },
      7: {
        'id': 7,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 5, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
          'id': 82639733, // PRIMARY KEY
          'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
          'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
          'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
          'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
          'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
          'number': 7,
          'title': 'Make sample graph data',
          'user': 1445825,
          'labels': [6],
          'state': 'open',
          'locked': false,
          'assignee': 1445825,
          'comments': 2,
          'created_at': '2015-05-30T00:18:26Z',
          'updated_at': '2015-05-30T00:43:54Z',
          'closed_at': null,
          'body': 'type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
        }, // foreign key ID from ISSUES table
        'upstream_nodes': [4,6], // foreign key ID from NODES table
        'downstream_nodes': [3] // foreign key ID from NODES table
      }
    };
    return res.json(graph);
  }
  res.end('could not find cluster');
});

router.post('/cluster/:cluster_id', function(req, res) {
  console.log(req.body);
  dbController.postCluster(req.body);
  res.end('cluster received');
});

router.post('/nodes', function(req, res) {
  console.log(req.body);
  dbController.postNodes(req.body);
  res.end('nodes received');
});


module.exports = router;
