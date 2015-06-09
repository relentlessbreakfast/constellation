/*
* @Author: Austin Liu
* @Date:   2015-06-01 17:41:31
* @Last Modified by:   Austin Liu
* @Last Modified time: 2015-06-08 11:55:51

*/

'use strict';

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

  var GraphService;
  var sampleGraph;
  var graph;

  // beforeEach(module('cd-app'));
  beforeEach(module('cd-app.common'));
  beforeEach(inject(function ($q, _GraphService_) {
   GraphService = _GraphService_;
   sampleGraph = GraphService.getGraph();
  }));

  describe('when instantiated', function() {
    var wrappedGraph;
    beforeEach(function() {
      graph = GraphService.getStubProjectClusterData();
      wrappedGraph = GraphService.getWrapper(graph);
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
  });

  describe('transitive reduction', function() {
    var wrappedGraph;
    
    beforeEach(function() {
      graph = GraphService.getStubProjectClusterData();
      wrappedGraph = GraphService.getWrapper(graph);
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
        graph = GraphService.getStubProjectClusterData();  //INSERTION
        wrappedGraph = GraphService.getWrapper(graph); // INSERTION
        console.log('wrappedGraph.graph is:', wrappedGraph.graph);
        // console.log('BEFORE EACH ––––––––––––––––––––––––––––');
        // console.log('wrappedGraph.graph[5].downstream_nodes is', wrappedGraph.graph[5].downstream_nodes);
        // console.log('wrappedGraph.graph[3].upstream_nodes is', wrappedGraph.graph[3].upstream_nodes);
        // console.log('========================================');
        // console.log('wrappedGraph.graph[4].downstream_nodes is', wrappedGraph.graph[4].downstream_nodes);
        // console.log('wrappedGraph.graph[6].downstream_nodes is', wrappedGraph.graph[6].downstream_nodes);
        // console.log('wrappedGraph.graph[5].upstream_nodes is', wrappedGraph.graph[5].upstream_nodes);
        // console.log('––––––––––––––––––––––––––––––––––––––––');
        wrappedGraph.deleteNode(5);
      });

      it('should break link from 3/4 to 5', function () {
        console.log('wrappedGraph.deleteNode(5)');
        console.log('wrappedGraph.graph[4].downstream_nodes', wrappedGraph.graph[4].downstream_nodes);
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
