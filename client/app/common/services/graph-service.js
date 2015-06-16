  /*
* @Author: kuychaco
* @Date:   2015-06-07 10:37:28
* @Last Modified by:   ChalrieHwang
*/

'use strict';

(function(angular, _) {


// ---------------------------------------------------------
// Data Objects
// ---------------------------------------------------------

  // input is parsed graph JSON
  var WrappedGraph = function(graphJson) {
    this.graph = graphJson;
  };

  // Subclass example: 
  // WrappedGraph.prototype = Object.create('Superclass'.prototype);
  WrappedGraph.prototype.constructor = WrappedGraph;

  //
  WrappedGraph.prototype.deleteNode = function(nodeId) {
    var wrappedGraph = this;
    // store upstream and downstream arrays
    var upstream = [];
    var downstream = [];
    // store upstream and downstream arrays
    if(wrappedGraph.graph[nodeId].upstream_nodes){
      upstream = wrappedGraph.graph[nodeId].upstream_nodes.slice();
    }
    if(wrappedGraph.graph[nodeId].downstream_nodes){
      downstream = wrappedGraph.graph[nodeId].downstream_nodes.slice();
    }
    // break links to nodeId
    upstream.forEach(function(upNodeId) {
      wrappedGraph.unlinkNodes(upNodeId, nodeId);
    });
    downstream.forEach(function(downNodeId) {
      wrappedGraph.unlinkNodes(nodeId, downNodeId);
    });
    // remove node from graph object
    // var parentClusterId = wrappedGraph.graph[nodeId].parent_cluster;
    delete wrappedGraph.graph[nodeId];
    //change the cluster number count
    // _.each(wrappedGraph.graph, function(obj){
    //   if(obj.parent_cluster === parentClusterId){
    //     if(obj.cluster.children_count >= 0){
    //       obj.cluster.children_count--;
    //     }
    //   }
    // });

    // create links between upstream and downstream nodes
    upstream.forEach(function(upNodeId) {
      downstream.forEach(function(downNodeId) {
        // linkNodes calls transitive reduction
        wrappedGraph.linkNodes(downNodeId, upNodeId);
      });
    });
    //add deleted node to
    wrappedGraph.graph.deleted.push(nodeId);
    // carry out transitive reduction one more time
  };

  WrappedGraph.prototype.addCluster = function(obj) {
    this.graph[300] = obj;
  };

  //Gather all possible upstream nodes
  WrappedGraph.prototype.gatherAllUpNodes = function(nodeId) {
    // catalog object w/ all upstream nodeIds as keys
    var catalog = {};
    var memo = {};
    var wrappedGraph = this;
    var recursiveGather = function (nodeId) {
      if(!memo[nodeId]){
        memo[nodeId] = true;
        if (wrappedGraph.graph[nodeId].upstream_nodes) {
          wrappedGraph.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
            catalog[upNodeId] = true;
            recursiveGather(upNodeId);
          }); 
        }
      }
    };
    recursiveGather(nodeId);
    return catalog;
  };  

  //Gather all possible downStream nodes
  WrappedGraph.prototype.gatherAllDownNodes = function(nodeId) {
    // catalog object w/ all upstream nodeIds as keys
    var catalog = {};
    var memo = {};
    var wrappedGraph = this;
    var recursiveGather = function (nodeId) {
      if(!memo[nodeId]){
        memo[nodeId] = true;
        if (wrappedGraph.graph[nodeId].downstream_nodes) {
          wrappedGraph.graph[nodeId].downstream_nodes.forEach(function(downNodeId) {
            catalog[downNodeId] = true;
            recursiveGather(downNodeId);
          }); 
        }
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
    var catalog = this.gatherAllUpNodes(nodeId);
    // remove all uplinks from node at nodeId
    this.purgeUplinksFromANode(nodeId, catalog);
    // add newUpNodeId to catalog
    catalog[newUpNodeId] = true;
    // remove nodeId from all downstream nodes
    this.purgeUplinksBelowANode(nodeId, catalog);
    
  };

  //
  WrappedGraph.prototype.linkNodes = function(downNodeId, upNodeId) {
    var wrappedGraph = this; 
    downNodeId = Number(downNodeId);
    upNodeId = Number(upNodeId);
    // adds appropriate nodeIds to upstream and downstream arrays
    if(!wrappedGraph.graph[upNodeId].downstream_nodes){
      wrappedGraph.graph[upNodeId].downstream_nodes = [];
    }
    if(!wrappedGraph.graph[downNodeId].upstream_nodes){
      wrappedGraph.graph[downNodeId].upstream_nodes = [];
    }
    var checkImmediateDown = function(downNodeId, upNodeId){
      if(!wrappedGraph.graph[downNodeId].downstream_nodes){
        wrappedGraph.graph[downNodeId].downstream_nodes = [];
      }

      if(!wrappedGraph.graph[upNodeId].downstream_nodes){
        wrappedGraph.graph[upNodeId].downstream_nodes = [];
      }
      var downNodeImmediateDown = wrappedGraph.graph[downNodeId].downstream_nodes;
      var upNodeImmediateDown = wrappedGraph.graph[upNodeId].downstream_nodes;
      //Node need to be delete by upNode
      var deletionQue = [];
      var deleteDown = [];
      upNodeImmediateDown.forEach(function(downId){
        if(wrappedGraph.gatherAllDownNodes(downNodeId).hasOwnProperty(downId)){
          deleteDown.push(downId);
        }
      });

      deleteDown.forEach(function(downId){
        var index = wrappedGraph.graph[upNodeId].downstream_nodes.indexOf(downId);
        wrappedGraph.graph[upNodeId].downstream_nodes.splice(index, 1);
        var id = wrappedGraph.graph[downId].upstream_nodes.indexOf(upNodeId);
        wrappedGraph.graph[downId].upstream_nodes.splice(id, 1);
      });

      upNodeImmediateDown.forEach(function(downId){
        var idx = downNodeImmediateDown.indexOf(downId); 
        if(idx !== -1){
          deletionQue.push(downId);
        }
      });
      deletionQue.forEach(function(ele){
        var index = wrappedGraph.graph[upNodeId].downstream_nodes.indexOf(ele);
        var id = wrappedGraph.graph[upNodeId].downstream_nodes.splice(index, 1);
        var idx = wrappedGraph.graph[id].upstream_nodes.indexOf(upNodeId);
        wrappedGraph.graph[id].upstream_nodes.splice(idx,1);
      });

    };
    var checkImmediateUp = function(downNodeId, upNodeId){
      var downNodeImmediateUp = wrappedGraph.graph[downNodeId].upstream_nodes;
      //Node need to be delete by upNode
      var deleteUp = [];
      downNodeImmediateUp.forEach(function(upId){
        if(wrappedGraph.gatherAllUpNodes(upNodeId).hasOwnProperty(upId)){
          deleteUp.push(upId);
        }
      });
      deleteUp.forEach(function(id){
        var index = wrappedGraph.graph[id].downstream_nodes.indexOf(downNodeId);
        wrappedGraph.graph[id].downstream_nodes.splice(index, 1);
        var idx = wrappedGraph.graph[downNodeId].upstream_nodes.indexOf(id);
        wrappedGraph.graph[downNodeId].upstream_nodes.splice(idx, 1);
      });
    };
    var checkUp = wrappedGraph.gatherAllUpNodes(downNodeId).hasOwnProperty(upNodeId);
    var checkDown = wrappedGraph.gatherAllDownNodes(downNodeId).hasOwnProperty(upNodeId);
    if(checkUp || checkDown){
      return;
    } else {
      checkImmediateUp(downNodeId, upNodeId);
      checkImmediateDown(downNodeId, upNodeId);
      wrappedGraph.graph[upNodeId].downstream_nodes.push(Number(downNodeId));
      wrappedGraph.graph[downNodeId].upstream_nodes.push(Number(upNodeId));
    }
  };

  //
  WrappedGraph.prototype.unlinkNodes = function(upNodeId, downNodeId) {
    // remove downNodeId from upNodeId's downstream array
    var graphObj = this.graph;
    downNodeId = Number(downNodeId);
    upNodeId = Number(upNodeId);
    var idx = graphObj[upNodeId].downstream_nodes.indexOf(downNodeId);
    graphObj[upNodeId].downstream_nodes.splice(idx,1);
    var index = graphObj[downNodeId].upstream_nodes.indexOf(upNodeId);
    graphObj[downNodeId].upstream_nodes.splice(index,1);
  };

  WrappedGraph.prototype.countNodes = function(){
    var notPartOfGraph = 3;
    var nodeCount = Object.keys(this.graph).length - notPartOfGraph; 
    return nodeCount;
  };

  WrappedGraph.prototype.countClosed = function(){
    var closedCount = 0;

    for(var key in this.graph){
      if(this.graph[key].type === 'issue' &&
        this.graph[key].issue_id.state === 'closed'){
        ++closedCount;
      } else if(this.graph[key].type === 'cluster'){
        if(this.graph[key].cluster.children_complete === this.graph[key].cluster.children_count){
          ++closedCount;
        }
      }
    }
    return closedCount;
  };
// ---------------------------------------------------------
// Service Definition
// ---------------------------------------------------------
  var GraphServiceFactory = function($http, $q) {
    
    return {
      graphObj: {},
      savedGraphObj:{},

      /**
       * Define function to save the changed data
       */
      saveData: function(endpoint, data){
        this.savedGraphObj[endpoint] = data;
      },

      /**
       * Delete node and Run transitive reduction check
       * @param  {int} cluster_id
       */
      deleteNode: function(nodeId){
        var graphObj = this.graphObj;
        var deferred = $q.defer();
        var clusterId = graphObj.graph[nodeId].parent_cluster;
        graphObj.deleteNode(nodeId);
        var grandparentId = graphObj.graph.grandparent_cluster_id;
        var saveObj = this.savedGraphObj;
        if(Object.keys(saveObj).length > 0){
          _.each(saveObj[grandparentId], function(obj){
            if(obj.cluster_id === clusterId){
              if(obj.cluster.children_count >= 0){
                obj.cluster.children_count--;
              }
            }
          });
        }
        deferred.resolve('OK');
        return deferred.promise;
      },

      /**
       * Delete edge and Run transitive reduction check
       */
      deleteEdge: function(upNodeId, downNodeId){
        var graphObj = this.graphObj;
        var deferred = $q.defer();
        graphObj.unlinkNodes(upNodeId, downNodeId);
        deferred.resolve('OK');
        return deferred.promise;
      },

      /**
       * Add new cluster function
       */
      addCluster: function(obj){
        var graphObj = this.graphObj;
        var deferred = $q.defer();
        graphObj.addCluster(obj);
        deferred.resolve('OK');
        return deferred.promise;
      },

      /**
       * Add new cluster function
       */
      addPredecessor: function(downstreamId, upstreamId){
        var graphObj = this.graphObj;
        var deferred = $q.defer();
        downstreamId = Number(downstreamId);
        upstreamId = Number(upstreamId);
        graphObj.linkNodes(downstreamId, upstreamId);
        deferred.resolve('OK');
        return deferred.promise;
      },

      /**
       * get graph from server
       * @param  {int} cluster_id
       * @return {undefined} [data outputs to graphObj in service object]
       */
      getGraph: function(cluster_id) {
        var deferred = $q.defer();
        var serviceObj = this;
        var saved = this.savedGraphObj;
        if(saved.hasOwnProperty(cluster_id)){
          serviceObj.graphObj.graph = saved[cluster_id];
          deferred.resolve(serviceObj.graphObj);
        } else {
          $http.get('http://localhost:3030/api/graph/' + cluster_id)
            .success(function(data, status) {
              var wrappedGraph = new WrappedGraph(data);
              var skipKeys = ['deleted', 'enter', 'exit', 'parent_cluster_id','grandparent_cluster_id'];
              var cleanData = function(graphObj){
                _.each(graphObj, function(obj, key){
                  if(skipKeys.indexOf(key) === -1){
                    if(obj.downstream_nodes === null){
                      obj.downstream_nodes = [];
                    }
                    if(obj.upstream_nodes === null){
                      obj.upstream_nodes = [];
                    }
                  }
                });
                _.each(graphObj, function(obj, key){
                  if(skipKeys.indexOf(key) === -1){
                    if(Number(obj.cluster_id) !== Number(graphObj.parent_cluster_id)){
                      obj.downstream_nodes.forEach(function(id){
                        if(graphObj[id].upstream_nodes.indexOf(id) === -1){
                          graphObj[id].upstream_nodes.push(Number(key));
                        }
                      });
                      obj.upstream_nodes.forEach(function(id){
                        if(graphObj[id].downstream_nodes.indexOf(id) === -1){
                          graphObj[id].downstream_nodes.push(Number(key));
                        }
                      });
                    }
                  }
                });
                return graphObj;
              };
              wrappedGraph.graph = cleanData(wrappedGraph.graph);
              serviceObj.graphObj = wrappedGraph;
              console.log('Success', status);
              deferred.resolve(wrappedGraph);
            })
            .error(function(data, status) {
              console.log('error on get:', status);
            });
        }
        return deferred.promise;
      },

      _getWrapper: function (json) {
        return new WrappedGraph(json);
      },

      postGraph: function() {
        var deferred = $q.defer();
        var graphObj = this.graphObj.graph;

        $http.post('http://localhost:54538/api/graph/'+graphObj.parent_cluster.id, graphObj)

          .success(function(response, status) {
            console.log('successful post:', status);
            deferred.resolve('successful post:', status);
          })

          .error(function(data, status) {
            console.log('error on post:', status);
          });

        return deferred.promise;
      },

      _getStubProjectClusterData: function () {
        var dummy = {
          entry: 2,
          deleted: [],
          parent_cluster:1,
          1: {
            'id': 1, // PRIMARY KEY
            'type': 'cluster',
            'parent_cluster': null, // foreign key ID from NODES table
            'cluster_id': 1,
            'cluster': {
              'id': 1,  // PRIMARY KEY
              'abbrev': 'ROOT',  // must be less than 32 chars
              'name': 'Project Root',
              'description': 'Cluster of entire project',
              'endpoints': [2, 3],  // these foreign key IDs for entries in NODES table
              'creator': 1445825,  // foreign key ID for entry in USERS table
              'children_count': 5,
              'children_complete': 0
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
              'state': 'closed',
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
            'cluster_id': 5, 
            'cluster': {
              'id': 5,  // PRIMARY KEY
              'abbrev': 'A/B',  // must be less than 32 chars
              'name': 'Cluster-Repo Selection Screen',
              'description': 'Cluster of repo selection related tasks',
              'endpoints': [13, 14],  // these foreign key IDs for entries in NODES table
              'creator': 1445825,  // foreign key ID for entry in USERS table
              'children_count': 5,
              'children_complete': 2
            }, // foreign key ID from CLUSTERS table
            'issue_id': null, // foreign key ID from ISSUES table
            'upstream_nodes': [4,6], // foreign key ID from NODES table
            'downstream_nodes': [3] // foreign key ID from NODES table
          },
          6: {
            'id': 6,// PRIMARY KEY
            'type': 'cluster',
            'parent_cluster': 1, // foreign key ID from NODES table
            'cluster_id': 2,
            'cluster': {
              'id': 2,  // PRIMARY KEY
              'abbrev': 'DB',  // must be less than 32 chars
              'name': 'Cluster-Database Schema',
              'description': 'Cluster of database schema related tasks',
              'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
              'creator': 1445825,  // foreign key ID for entry in USERS table
              'children_count': 2,
              'children_complete': 2
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
      }
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------
  angular
    .module('cd-app.common')
    .factory('GraphService', GraphServiceFactory);

})(angular, _);
