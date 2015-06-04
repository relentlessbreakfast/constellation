/*
* @Author: kuychaco
* @Date:   2015-06-03 11:34:51
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-04 12:11:38
*/

'use strict';

describe('get graph', function() {
  var $httpBackend;
  var graphGetRequestHandler;

  // beforeEach(module('cd-app'));
  beforeEach(module('cd-app.common'));
  beforeEach(inject(function($injector, _GraphService_) {
    graphService = _GraphService_;
    $httpBackend = $injector.get('$httpBackend');
    graphGetRequestHandler = $httpBackend.when('GET', '/cluster/1').respond(parentCluster);
    graphGetRequestHandler = $httpBackend.when('GET', '/cluster/5').respond(cluster5);
  }))

  xit('should return a cluster JSON when called', function () {

    graphService.getGraph(1, function(graph) {
      expect(graph.cluster_id).toBe(1);
    });

    expect(JSON.parse(graphService.getGraph()).parent_cluster.type).toBe('cluster');
  });

  xit('should return project root cluster JSON when called with no arguments', function () {
    expect(JSON.parse(graphService.getGraph()).parent_cluster.parent_cluster).toBeNull();
  });

  xit('should return project root cluster JSON when called with cluster_id of 1', function () {
    expect(JSON.parse(graphService.getGraph(1)).parent_cluster.parent_cluster).toBeNull();
  });

  xit('should return JSON with correct nodes when called with cluster_id', function () {
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
