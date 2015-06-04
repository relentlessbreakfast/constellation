/*
* @Author: kuychaco
* @Date:   2015-06-03 10:37:28
* @Last Modified by:   justinwebb
*/

'use strict';

(function(angular) {


// ---------------------------------------------------------
// Data Objects
// ---------------------------------------------------------

  // input is parsed graph JSON
  var WrappedGraph = function(graphObj) {
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
  var GraphServiceProvider = function($http, $q) {

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
        cluster_id = (cluster_id === undefined) ? 1 : cluster_id;
        $http.get('/cluster/'+cluster_id)

          .success(function(data, status, headers) {
            console.log('successful get:', status);
            var graph = JSON.parse(data);
            var wrappedGraph = new WrappedGraph(graph);
            serviceObj.graphObj = wrappedGraph;
            deferred.resolve(wrappedGraph);
          })

          .error(function(data, status, headers) {
            console.log('error on get:', status);
          });

        return deferred.promise;

      },

      graphClass: WrappedGraph,

      postGraph: function() {
        var deferred = $q.defer();
        var graphObj = this.graphObj;
        $http.post('/cluster/'+graphObj.parent_cluster.id, graphObj)

          .success(function(response, status, headers) {
            console.log('successful post:', status);
            deferred.resolve('successful post:', status);
          })

          .error(function(data, status, headers) {
            console.log('error on post:', status);
          });

        return deferred.promise;
      }
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------
  angular
    .module('cd-app.common')
    .factory('GraphService', GraphServiceProvider);

})(angular);
