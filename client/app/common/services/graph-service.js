/*
* @Author: kuychaco
* @Date:   2015-06-03 10:37:28
* @Last Modified by:   ChalrieHwang
*/

'use strict';

(function(angular) {


// ---------------------------------------------------------
// Data Objects
// ---------------------------------------------------------

  // input is parsed graph JSON
  var WrappedGraph = function(graphJson) {
    // INSERTION to pass test––
    // expect(typeof wrappedGraph.graph).toBe('object');
    var graphObj = JSON.parse(graphJson); 
    this.graph = graphObj;
  };
  
  // Subclass example: 
  // WrappedGraph.prototype = Object.create('Superclass'.prototype);
  WrappedGraph.prototype.constructor = WrappedGraph;

  //
  WrappedGraph.prototype.deleteNode = function(nodeId) {
    var wrappedGraph = this;
    // store upstream and downstream arrays
    var upstream = this.graph[nodeId].upstream_nodes.slice() || [];
    var downstream = this.graph[nodeId].downstream_nodes.slice() || [];
    // break links to nodeId
    upstream.forEach(function(upNodeId) {
      wrappedGraph.unlinkNodes(upNodeId, nodeId);
    });
    downstream.forEach(function(downNodeId) {
      wrappedGraph.unlinkNodes(nodeId, downNodeId);
    });
    // remove node from graph object
    delete wrappedGraph.graph[nodeId];
    // create links between upstream and downstream nodes
    upstream.forEach(function(upNodeId) {
      downstream.forEach(function(downNodeId) {
        // linkNodes calls transitive reduction
        wrappedGraph.linkNodes(upNodeId, downNodeId);
      });
    });
  };

  // 
  WrappedGraph.prototype.gatherUpstreamNodeRefs = function(nodeId) {
    // catalog object w/ all upstream nodeIds as keys
    var catalog = {};
    var wrappedGraph = this;
    var recursiveGather = function (nodeId) {
      if (wrappedGraph.graph[nodeId].upstream_nodes) {
        wrappedGraph.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
          catalog[upNodeId] = true;
          recursiveGather(upNodeId);
        }); 
      }
    };
    recursiveGather(nodeId);
    return catalog;
  };

  // 
  WrappedGraph.prototype.purgeUplinksFromANode = function(nodeId, catalogObj) {
    var wrappedGraph = this;
    if (wrappedGraph.graph[nodeId].upstream_nodes) {
      wrappedGraph.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
        if (catalogObj.hasOwnProperty(upNodeId)) {
          wrappedGraph.unlinkNodes(upNodeId, nodeId);
        }
      });
    }
  };

  // 
  WrappedGraph.prototype.purgeUplinksBelowANode = function(nodeId, catalogObj) {
    var wrappedGraph = this;
    if (wrappedGraph.graph[nodeId].downstream_nodes) {
      wrappedGraph.graph[nodeId].downstream_nodes.forEach(function(downNodeId) {
        wrappedGraph.purgeUplinksFromANode(downNodeId, catalogObj);
        wrappedGraph.purgeUplinksBelowANode(downNodeId, catalogObj);
      }); 
    }
  };

  /** Given a particular node and a new dependency (new upstream node) **/
  WrappedGraph.prototype.transitiveReduction = function(nodeId, newUpNodeId) {
    // gather all upstream nodeIds
    var catalog = this.gatherUpstreamNodeRefs(newUpNodeId);
    // remove all uplinks from node at nodeId
    this.purgeUplinksFromANode(nodeId, catalog);
    // add newUpNodeId to catalog
    catalog[newUpNodeId] = true;
    // remove nodeId from all downstream nodes
    this.purgeUplinksBelowANode(nodeId, catalog);
  };

  //
  WrappedGraph.prototype.linkNodes = function(upNodeId, downNodeId) {
    // adds appropriate nodeIds to upstream and downstream arrays
    this.graph[upNodeId].downstream_nodes.push(downNodeId);
    this.graph[downNodeId].upstream_nodes.push(upNodeId);
    // do transitive reduction
    this.transitiveReduction(downNodeId, upNodeId);
  };

  //
  WrappedGraph.prototype.unlinkNodes = function(upNodeId, downNodeId) {
    // remove downNodeId from upNodeId's downstream array
    this.graph[upNodeId].downstream_nodes.forEach(function(nodeId, i, arr) {
      if (nodeId === downNodeId) {
        arr.splice(i,1);
      }
    });
    // remove upNodeId from downNodeId's upstream array
    this.graph[downNodeId].upstream_nodes.forEach(function(nodeId, i, arr) {
      if (nodeId === upNodeId) {
        arr.splice(i,1);
      }
    });
  };

// ---------------------------------------------------------
// Service Definition
// ---------------------------------------------------------
  var GraphServiceFactory = function($http, $q) {
    var dummy2 = {
          entry: 11,
          parent_cluster: 5,
          5: {
              'id': 5,// PRIMARY KEY
              'type': 'cluster',
              'parent_cluster': 1, // foreign key ID from NODES table
              'cluster_id': {
              'id': 5,  // PRIMARY KEY
              'abbrev': 'A/B',  // must be less than 32 chars
              'name': 'Cluster-Repo Selection Screen',
              'description': 'Cluster of repo selection related tasks',
              'endpoints': [13, 14],  // these foreign key IDs for entries in NODES table
              'creator': 1445825  // foreign key ID for entry in USERS table
              }, // foreign key ID from CLUSTERS table
              'issue_id': null, // foreign key ID from ISSUES table
              'upstream_nodes': [4,6], // foreign key ID from NODES table
              'downstream_nodes': [3] // foreign key ID from NODES table
            },
          11: {
            'id': 11,// PRIMARY KEY
            'type': 'entry',
            'parent_cluster': 5, // foreign key ID from NODES table
            'cluster_id': null, // foreign key ID from CLUSTERS table
            'issue_id': null, // foreign key ID from ISSUES table
            'upstream_nodes': null, // foreign key ID from NODES table
            'downstream_nodes': [13,43,44,45] // foreign key ID from NODES table
          },
          12: {
            'id': 12,// PRIMARY KEY
            'type': 'exit',
            'parent_cluster': 5, // foreign key ID from NODES table
            'cluster_id': null, // foreign key ID from CLUSTERS table
            'issue_id': null, // foreign key ID from ISSUES table
            'upstream_nodes': [15,43,44,45], // foreign key ID from NODES table
            'downstream_nodes': [] // foreign key ID from NODES table
          },
          13: {
            'id': 13,// PRIMARY KEY
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
              'number': 13,
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
            'upstream_nodes': [11], // foreign key ID from NODES table
            'downstream_nodes': [12,16] // foreign key ID from NODES table
          },
          16: {
            'id': 16,// PRIMARY KEY
            'type': 'cluster',
            'parent_cluster': 5, // foreign key ID from NODES table
            'cluster_id': {
              'id': 16,  // PRIMARY KEY
              'abbrev': 'Server',  // must be less than 32 chars
              'name': 'Express framework',
              'description': 'Cluster of database schema related tasks',
              'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
              'creator': 1445825  // foreign key ID for entry in USERS table
            }, // foreign key ID from CLUSTERS table
            'issue_id': null, // foreign key ID from ISSUES table
            'upstream_nodes': [13], // foreign key ID from NODES table
            'downstream_nodes': [15] // foreign key ID from NODES table
          },
          15: {
            'id': 15,// PRIMARY KEY
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
              'number': 15,
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
            'upstream_nodes': [16], // foreign key ID from NODES table
            'downstream_nodes': [40] // foreign key ID from NODES table
          },          
          40: {
            'id': 40,// PRIMARY KEY
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
              'number': 40,
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
            'upstream_nodes': [15], // foreign key ID from NODES table
            'downstream_nodes': [41] // foreign key ID from NODES table
          },
          41: {
            'id': 41,// PRIMARY KEY
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
              'number': 41,
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
            'upstream_nodes': [40], // foreign key ID from NODES table
            'downstream_nodes': [42] // foreign key ID from NODES table
          },
          42: {
            'id': 42,// PRIMARY KEY
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
              'number': 42,
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
            'upstream_nodes': [41], // foreign key ID from NODES table
            'downstream_nodes': [12] // foreign key ID from NODES table
          },
          43: {
            'id': 43,// PRIMARY KEY
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
              'number': 43,
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
            'upstream_nodes': [11], // foreign key ID from NODES table
            'downstream_nodes': [12] // foreign key ID from NODES table
          },
          44: {
            'id': 44,// PRIMARY KEY
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
              'number': 44,
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
            'upstream_nodes': [11], // foreign key ID from NODES table
            'downstream_nodes': [12] // foreign key ID from NODES table
          },
          45: {
            'id': 45,// PRIMARY KEY
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
              'number': 45,
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
            'upstream_nodes': [11], // foreign key ID from NODES table
            'downstream_nodes': [12] // foreign key ID from NODES table
          }
        };   

    var dummy = {
      entry: 2,
      parent_cluster: 1,
      1: {
        'id': 1, // PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': null, // foreign key ID from NODES table
        'cluster_id': {
        'id': 1,  // PRIMARY KEY
        'abbrev': 'REPO',  // must be less than 32 chars
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
        'id': 5,  // PRIMARY KEY
        'abbrev': 'CSS',  // must be less than 32 chars
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
        'id': 6,  // PRIMARY KEY
        'abbrev': 'Testing',  // must be less than 32 chars
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

    var dummy3 = {
      entry: 17,
      parent_cluster: 16,
       16: {
            'id': 16,// PRIMARY KEY
            'type': 'cluster',
            'parent_cluster': 5, // foreign key ID from NODES table
            'cluster_id': {
              'id': 16,  // PRIMARY KEY
              'abbrev': 'Server',  // must be less than 32 chars
              'name': 'Express framework',
              'description': 'Cluster of database schema related tasks',
              'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
              'creator': 1445825  // foreign key ID for entry in USERS table
            }, // foreign key ID from CLUSTERS table
            'issue_id': null, // foreign key ID from ISSUES table
            'upstream_nodes': [11], // foreign key ID from NODES table
            'downstream_nodes': [15] // foreign key ID from NODES table
          },
        17: {
        'id': 17,// PRIMARY KEY
        'type': 'entry',
        'parent_cluster': 16, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': null, // foreign key ID from NODES table
        'downstream_nodes': [19] // foreign key ID from NODES table
      },
      18: {
        'id': 18,// PRIMARY KEY
        'type': 'exit',
        'parent_cluster': 16, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [19], // foreign key ID from NODES table
        'downstream_nodes': [] // foreign key ID from NODES table
      },
      19: {
        'id': 19,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 16, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
        'id': 82639733, // PRIMARY KEY
        'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
        'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
        'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
        'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
        'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
        'number': 19,
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

        'upstream_nodes': [17], // foreign key ID from NODES table
        'downstream_nodes': [18] // foreign key ID from NODES table
      }
    };
    var dummy4 = {
      entry: 20,
      parent_cluster: 6,
        6: {
        'id': 6,// PRIMARY KEY
        'type': 'cluster',
        'parent_cluster': 1, // foreign key ID from NODES table
        'cluster_id': {
        'id': 6,  // PRIMARY KEY
        'abbrev': 'Testing',  // must be less than 32 chars
        'name': 'Cluster-Database Schema',
        'description': 'Cluster of database schema related tasks',
        'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
        'creator': 1445825  // foreign key ID for entry in USERS table
        }, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [2], // foreign key ID from NODES table
        'downstream_nodes': [5,7] // foreign key ID from NODES table
      },
        20: {
        'id': 20,// PRIMARY KEY
        'type': 'entry',
        'parent_cluster': 6, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': null, // foreign key ID from NODES table
        'downstream_nodes': [22,23] // foreign key ID from NODES table
      },
      21: {
        'id': 21,// PRIMARY KEY
        'type': 'exit',
        'parent_cluster': 6, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': null, // foreign key ID from ISSUES table
        'upstream_nodes': [22], // foreign key ID from NODES table
        'downstream_nodes': [] // foreign key ID from NODES table
      },
      22: {
        'id': 22,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 6, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
        'id': 82639733, // PRIMARY KEY
        'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
        'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
        'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
        'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
        'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
        'number': 22,
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

        'upstream_nodes': [20], // foreign key ID from NODES table
        'downstream_nodes': [21] // foreign key ID from NODES table
      },
      23: {
        'id': 23,// PRIMARY KEY
        'type': 'issue',
        'parent_cluster': 6, // foreign key ID from NODES table
        'cluster_id': null, // foreign key ID from CLUSTERS table
        'issue_id': {
        'id': 82639733, // PRIMARY KEY
        'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
        'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
        'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
        'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
        'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
        'number': 23,
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

        'upstream_nodes': [20], // foreign key ID from NODES table
        'downstream_nodes': [21] // foreign key ID from NODES table
      }
    };

    return {
      graphObj: null,
      /**
       * get graph from server
       * @param  {int} cluster_id
       * @return {undefined} [data outputs to graphObj in service object]
       */
      getGraph: function(cluster_id) {
        var deferred = $q.defer();
        var serviceObj = this;
        var data;
        // cluster_id = (cluster_id === undefined) ? 1 : cluster_id;
        // $http.get('/cluster/' + cluster_id)

        //   .success(function(data, status, headers) {
        //     console.log('successful get:', status);
        //     var graph = JSON.parse(data);
        //     var wrappedGraph = new WrappedGraph(graph);
        //     serviceObj.graphObj = wrappedGraph;
        //     deferred.resolve(wrappedGraph);
        //   })

        //   .error(function(data, status, headers) {
        //     console.log('error on get:', status);
        //     console.log(deferred.promise);  
        //   });
        if(cluster_id === 1){
          data = dummy;
        } else if (cluster_id === 5){
          data = dummy2;
        } else if (cluster_id === 16){
          data = dummy3;
        } else if (cluster_id === 6){
          data = dummy4;
        } 
        serviceObj.graphObj = data;
        deferred.resolve('OK');
        return deferred.promise;
      },

      getWrapper: function (json) {
        return new WrappedGraph(json);
      },

      postGraph: function() {
        var deferred = $q.defer();
        var graphObj = this.graphObj;
        $http.post('/cluster/'+graphObj.parent_cluster.id, graphObj)

          .success(function(response, status) {
            console.log('successful post:', status);
            deferred.resolve('successful post:', status);
          })

          .error(function(data, status) {
            console.log('error on post:', status);
          });

        return deferred.promise;
      },

      getStubProjectClusterData: function () {
        var dummy = {
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
        return JSON.stringify(dummy);
      },


      getStubCluster5: function () {

        var cluster5 = JSON.stringify({
          entry: 2,
          parent_cluster: 5,
          5: {
              'id': 5, // PRIMARY KEY
              'type': 'cluster',
              'parent_cluster': 1, // foreign key ID from NODES table
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
            'parent_cluster': 5, // foreign key ID from NODES table
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
        });
        return cluster5;
      }
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------
  angular
    .module('cd-app.common')
    .factory('GraphService', GraphServiceFactory);

})(angular);
