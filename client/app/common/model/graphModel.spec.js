/*
* @Author: Austin Liu
* @Date:   2015-06-01 17:41:31
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-02 19:08:59

*/

// 'use strict';

var sampleGraph = JSON.stringify({
  entry: 2,
  1: {
    "id": 1, // PRIMARY KEY
    "type": "cluster",
    "parent_cluster": null, // foreign key ID from NODES table
    "cluster_id": {
      "id": 1,  // PRIMARY KEY
      "abbrev": "ROOT",  // must be less than 32 chars
      "name": "Project Root",
      "description": "Cluster of entire project",
      "endpoints": [2, 3],  // these foreign key IDs for entries in NODES table
      "creator": 1445825  // foreign key ID for entry in USERS table
    }, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": [], // foreign key ID from NODES table
    "downstream_nodes": [] // foreign key ID from NODES table
  },
  2: {
    "id": 2,// PRIMARY KEY
    "type": "entry",
    "parent_cluster": 1, // foreign key ID from NODES table
    "cluster_id": null, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": null, // foreign key ID from NODES table
    "downstream_nodes": [4,6] // foreign key ID from NODES table
  },
  3: {
    "id": 3,// PRIMARY KEY
    "type": "exit",
    "parent_cluster": 1, // foreign key ID from NODES table
    "cluster_id": null, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": [5,7], // foreign key ID from NODES table
    "downstream_nodes": [] // foreign key ID from NODES table
  },
  4: {
    "id": 4,// PRIMARY KEY
    "type": "issue",
    "parent_cluster": 1, // foreign key ID from NODES table
    "cluster_id": null, // foreign key ID from CLUSTERS table
    "issue_id": {
      "id": 82639324,
      "url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4",
      "labels_url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}",
      "comments_url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments",
      "events_url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events",
      "html_url": "https://github.com/relentlessbreakfast/sampleGraph/issues/4",
      "number": 4,
      "title": "Add O-auth",
      "user": 1445825,
      "labels": [1],
      "state": "open",
      "locked": false,
      "assignee": 442978,
      "comments": 0,
      "created_at": "2015-05-30T00:16:35Z",
      "updated_at": "2015-05-30T00:44:37Z",
      "closed_at": null,
      "body": "Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data"
    }, // foreign key ID from ISSUES table
    "upstream_nodes": [2], // foreign key ID from NODES table
    "downstream_nodes": [5,7] // foreign key ID from NODES table
  },
  5: {
    "id": 5,// PRIMARY KEY
    "type": "cluster",
    "parent_cluster": 1, // foreign key ID from NODES table
    "cluster_id": {
      "id": 3,  // PRIMARY KEY
      "abbrev": "Repo selection",  // must be less than 32 chars
      "name": "Cluster-Repo Selection Screen",
      "description": "Cluster of repo selection related tasks",
      "endpoints": [13, 14],  // these foreign key IDs for entries in NODES table
      "creator": 1445825  // foreign key ID for entry in USERS table
    }, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": [4,6], // foreign key ID from NODES table
    "downstream_nodes": [3] // foreign key ID from NODES table
  },
  6: {
    "id": 6,// PRIMARY KEY
    "type": "cluster",
    "parent_cluster": 1, // foreign key ID from NODES table
    "cluster_id": {
      "id": 2,  // PRIMARY KEY
      "abbrev": "DB",  // must be less than 32 chars
      "name": "Cluster-Database Schema",
      "description": "Cluster of database schema related tasks",
      "endpoints": [11, 12],  // these foreign key IDs for entries in NODES table
      "creator": 1445825  // foreign key ID for entry in USERS table
    }, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": [2], // foreign key ID from NODES table
    "downstream_nodes": [5,7] // foreign key ID from NODES table
  },
  7: {
    "id": 7,// PRIMARY KEY
    "type": "issue",
    "parent_cluster": 1, // foreign key ID from NODES table
    "cluster_id": null, // foreign key ID from CLUSTERS table
    "issue_id": {
      "id": 82639733, // PRIMARY KEY
      "url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7",
      "labels_url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}",
      "comments_url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments",
      "events_url": "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events",
      "html_url": "https://github.com/relentlessbreakfast/sampleGraph/issues/7",
      "number": 7,
      "title": "Make sample graph data",
      "user": 1445825,
      "labels": [6],
      "state": "open",
      "locked": false,
      "assignee": 1445825,
      "comments": 2,
      "created_at": "2015-05-30T00:18:26Z",
      "updated_at": "2015-05-30T00:43:54Z",
      "closed_at": null,
      "body": "type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data"
    }, // foreign key ID from ISSUES table
    "upstream_nodes": [4,6], // foreign key ID from NODES table
    "downstream_nodes": [3] // foreign key ID from NODES table
  }
});

/* * * * * GRAPH CLASS * * * * */

// input is parsed graph JSON
var WrappedGraph = function(graphObj) {
  this.graph = graphObj;
};


/* * * * * GRAPH OPERATIONS * * * * */

/* * * * * Add/Remove Node * * * * */

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

/* * * * * Add/Remove link * * * * */


WrappedGraph.prototype.linkNodes = function(upNodeId, downNodeId) {
  // adds appropriate nodeIds to upstream and downstream arrays
  this.graph[upNodeId].downstream_nodes.push(downNodeId);
  this.graph[downNodeId].upstream_nodes.push(upNodeId);
  // do transitive reduction
  this.transitiveReduction(downNodeId, upNodeId);
};

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


/* * * * * Transitive Reduction * * * * *
Given a particular node and a new dependency (new upstream node)
*/

WrappedGraph.prototype.gatherUpstreamNodeRefs = function(nodeId) {
  // catalog object w/ all upstream nodeIds as keys
  var catalog = {};
  var wrappedGraph = this;
  // recurse up to entry node and add nodeIds to catalog
  var recurse = function (nodeId) {
    wrappedGraph.graph[nodeId].upstream_nodes && wrappedGraph.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
      catalog[upNodeId] = true;
      recurse(upNodeId);
    });
  };
  recurse(nodeId);

  return catalog;
};

WrappedGraph.prototype.purgeUplinksFromANode = function(nodeId, catalogObj) {
  var wrappedGraph = this;
  // iterate through nodeIds in upstream array for node with nodeId
  this.graph[nodeId].upstream_nodes && this.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
    // if uplinkNodeId is in catalogObj
    if (catalogObj.hasOwnProperty(upNodeId)) {
      wrappedGraph.unlinkNodes(upNodeId, nodeId);
    }
  });
};

WrappedGraph.prototype.purgeUplinksBelowANode = function(nodeId, catalogObj) {
  var wrappedGraph = this;
  // iterate through nodeIds in downstream array for node with nodeId
  this.graph[nodeId].downstream_nodes && this.graph[nodeId].downstream_nodes.forEach(function(downNodeId) {
    // purgeUplinksFromANode for each nodeId in upstream array of node
    wrappedGraph.purgeUplinksFromANode(downNodeId, catalogObj);
    // recursive call for each downstream nodeId
    wrappedGraph.purgeUplinksBelowANode(downNodeId, catalogObj);
  });
};

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

/* * * * * * * * * * * * * * * * * * */

/*
  matchers:
    - toBe, ===
    - toEqual, ==
    - toMatch, (regex)
    - toBeDefined, not undefined
    - toBeUndefined
    - toBeNull
    - toBeTruthy
    - toBeFalsey
    - toContain, searches array for value
    - toBeLessThan
    - toBeGreaterThan
    - toThrow, catch expected exceptions
 */

describe('Graph Class', function() {

  var graph;

  beforeEach(function() {
    graph = JSON.parse(sampleGraph);
  });

  describe('initial graph class', function() {
    var wrappedGraph;
    beforeEach(function() {
      wrappedGraph = new WrappedGraph(graph);
    });

    it('should be a function', function () {
      expect(typeof WrappedGraph).toBe('function');
    });

    it('should return an object with graph property', function () {
      expect(typeof wrappedGraph.graph).toBe('object');
    });

    it('should have connection between nodes 2 and 4', function () {
      expect(wrappedGraph.graph[2].downstream_nodes).toContain(4);
      expect(wrappedGraph.graph[4].upstream_nodes).toContain(2);
    });

    it('should not have connection between nodes 4 and 6', function () {
      expect(wrappedGraph.graph[6].downstream_nodes.indexOf(4)).toBe(-1);
      expect(wrappedGraph.graph[4].upstream_nodes.indexOf(6)).toBe(-1);
    });

    describe('transitive reduction', function() {

      beforeEach(function() {
        wrappedGraph.linkNodes(6,4);
      });

      it('should create link between nodes 4 and 6', function () {
        expect(wrappedGraph.graph[6].downstream_nodes).toContain(4);
        expect(wrappedGraph.graph[4].upstream_nodes).toContain(6);
      });

      it('should break links between nodes 2 and 4', function () {
        expect(wrappedGraph.graph[2].downstream_nodes.indexOf(4)).toBe(-1);
        expect(wrappedGraph.graph[4].upstream_nodes.indexOf(2)).toBe(-1);
      });

      it('should break links between nodes 6 and 7', function () {
        expect(wrappedGraph.graph[6].downstream_nodes.indexOf(7)).toBe(-1);
        expect(wrappedGraph.graph[7].upstream_nodes.indexOf(6)).toBe(-1);
      });

      it('should break links between nodes 6 and 5', function () {
        expect(wrappedGraph.graph[6].downstream_nodes.indexOf(5)).toBe(-1);
        expect(wrappedGraph.graph[5].upstream_nodes.indexOf(6)).toBe(-1);
      });

      describe('delete node', function() {

        beforeEach(function() {
          wrappedGraph.deleteNode(5);
        });

        it('should break link from 3/4 to 5', function () {
          expect(wrappedGraph.graph[4].downstream_nodes.indexOf(5)).toBe(-1);
          expect(wrappedGraph.graph[3].upstream_nodes.indexOf(5)).toBe(-1);
          expect(wrappedGraph.graph[5]).toBeUndefined();
        });

        it('transfer link from 3 to 4', function () {
          wrappedGraph.deleteNode(7);
          expect(wrappedGraph.graph[4].downstream_nodes).toContain(3);
          expect(wrappedGraph.graph[3].upstream_nodes).toContain(4);
        });
      });
    });


  });


});
