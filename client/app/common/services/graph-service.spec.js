/*
* @Author: kuychaco
* @Date:   2015-06-03 11:34:51
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-03 16:32:58
*/

'use strict';

var cluster1 = JSON.stringify({
  entry: 2,
  parent_cluster: {
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

var cluster5 = JSON.stringify({
  entry: 2,
  parent_cluster: {
    "id": 5, // PRIMARY KEY
    "type": "cluster",
    "parent_cluster": 1, // foreign key ID from NODES table
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
    "parent_cluster": 5, // foreign key ID from NODES table
    "cluster_id": null, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": null, // foreign key ID from NODES table
    "downstream_nodes": [4,6] // foreign key ID from NODES table
  },
  3: {
    "id": 3,// PRIMARY KEY
    "type": "exit",
    "parent_cluster": 5, // foreign key ID from NODES table
    "cluster_id": null, // foreign key ID from CLUSTERS table
    "issue_id": null, // foreign key ID from ISSUES table
    "upstream_nodes": [5,7], // foreign key ID from NODES table
    "downstream_nodes": [] // foreign key ID from NODES table
  },
  4: {
    "id": 4,// PRIMARY KEY
    "type": "issue",
    "parent_cluster": 5, // foreign key ID from NODES table
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
    "parent_cluster": 5, // foreign key ID from NODES table
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
    "parent_cluster": 5, // foreign key ID from NODES table
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
    "parent_cluster": 5, // foreign key ID from NODES table
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


describe('get graph', function() {
  var $httpBackend, graphGetRequestHandler;

  beforeEach(module('cd-app.common'));
  beforeEach(inject(function($injector, _GraphService_) {
    graphService = _GraphService_;
    $httpBackend = $injector.get('$httpBackend');
    graphGetRequestHandler = $httpBackend.when('GET', '/cluster/1').respond(cluster1);
    graphGetRequestHandler = $httpBackend.when('GET', '/cluster/5').respond(cluster5);
  }))

  it('should return a cluster JSON when called', function () {

    graphService.getGraph(1, function(graph) {
      expect(graph.cluster_id).toBe(1);
    });

    expect(JSON.parse(graphService.getGraph()).parent_cluster.type).toBe('cluster');
  });

  it('should return project root cluster JSON when called with no arguments', function () {
    expect(JSON.parse(graphService.getGraph()).parent_cluster.parent_cluster).toBeNull();
  });

  it('should return project root cluster JSON when called with cluster_id of 1', function () {
    expect(JSON.parse(graphService.getGraph(1)).parent_cluster.parent_cluster).toBeNull();
  });

  it('should return JSON with correct nodes when called with cluster_id', function () {
    expect(JSON.parse(graphService.getGraph(5)).parent_cluster.id).toBe(5);
  });

});


/*

when getGraph is called w/ no parameters it should return json for entire project

when called with cluster_id it should return json for graph with all nodes having property parent_cluter = cluster_id

postGraph
  // convert graph POJO into JSON
  // post request to server with JSON

*/