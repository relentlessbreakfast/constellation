/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-05 14:56:29
*/

'use strict';
(function(angular){

  var GraphConfig = function($stateProvider){
    $stateProvider.state('graph',{
      url: '/graph',
      templateUrl: 'graphpanel/graph.tpl.html',
      controller: GraphCtrl
    });
  };

  var GraphCtrl = function($scope, D3Service){
    var d3 = D3Service.getD3();
    var dagreD3 = D3Service.getDagreD3();

    /**
     * Define function for creating the graph canvas object
     * @return {d3} d3 graph object
     */
    $scope.createCanvas = function(){
      var g = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function() { 
          return {}; 
        });
      return g;
    };

    /**
     * Define function for rendering nodes on the graph
     * @param  {d3} canvas d3 graph object
     */
    $scope.renderGraph = function(canvas){
      var render = new dagreD3.render();
      var svg = d3.select('svg');
      render(d3.select('svg g'), canvas);
      var initialScale = 1.5;
      var width = canvas.graph().width * initialScale;
      $scope.onZoom()
        .translate([(svg.attr('width') - width) / 40 + 70, 20])
        .scale(initialScale)
        .event(svg);
      svg.attr('height', canvas.graph().height * initialScale + 40);
    };

    /**
     * Define event listeners to handle zooming
     * @return {d3} [description]
     */
    $scope.onZoom = function(){
      var svg = d3.select('svg');
      var inner = svg.select('g');
      var zoom = d3.behavior.zoom().on('zoom', function() {
            inner.attr('transform', 'translate(' + d3.event.translate + ')'+'scale(' + d3.event.scale + ')');
          });
      svg.call(zoom);
      return zoom;
    };

    /**
     * Define function to create node in graph object
     * @param  {d3} canvas  d3 graph object to collect nodes
     * @param  {json} jsonObj node data from server
     */
    $scope.createIssueNode = function(jsonObj){
      var id = jsonObj.id;
      var label;
      if(jsonObj.type === 'issue'){
        label = '#' + jsonObj.issue_id.number;
      } else {
        label = jsonObj.type;
      }
      var nodeType = jsonObj.type;
      $scope.g.setNode(id, {
        label: label, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.g.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.g.node(id).clusterId = jsonObj.cluster_id;
      $scope.g.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.g.node(id).downstreams = jsonObj.downstream_nodes; 
      if(nodeType === 'issue'){
        $scope.g.node(id).description = jsonObj.issue_id.title;
        $scope.g.node(id).asignee = jsonObj.issue_id.assignee;
        $scope.g.node(id).status = jsonObj.issue_id.state;
        $scope.g.node(id).issueType = jsonObj.issue_id.labels;
        $scope.g.node(id).url = jsonObj.issue_id.url;
      }
    };

    /**
     * Define function to create clusterNode in graph object
     * @param  {d3} canvas  d3 graph object to collect nodes
     * @param  {json} jsonObj node data from server
     */
    $scope.createClusterNode = function(jsonObj){
      var id = jsonObj.id;
      var label = jsonObj.cluster_id.abbrev;
      var nodeType = jsonObj.type;
      $scope.g.setNode(id, {
        label: label, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.g.node(id).clusterId = jsonObj.cluster_id.id;
      $scope.g.node(id).description = jsonObj.cluster_id.description;
      $scope.g.node(id).creator = jsonObj.cluster_id.creator;
      $scope.g.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.g.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.g.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.g.node(id).endpoints = jsonObj.cluster_id.endpoints;
    };

    /**
     * Define function to setup all edges of the node
     * @param  {d3} canvas d3 graph object
     * @param  {number} id     The id of node
     */
    $scope.createEdge = function(id){
      if(id){
        $scope.g.node(id).downstreams.forEach(function(downstreamID){
          $scope.g.setEdge(id, downstreamID, {lineInterpolate: 'basis'});
        });
      }
    };

    //Testing Data
    $scope.data = {
      parent_cluster : 1,
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
      }
    };
    
     /**
     * Define function to draw the final graph
     */
    $scope.buildGraph = function(data){
      if($scope.g !== undefined){
        $scope.g = $scope.createCanvas();
        var parentId = data.parent_cluster;
        //Create Nodes
        _.each(data, function(obj, key){
          var tp = obj.type;
          if(tp === 'issue' || tp === 'entry' || tp === 'exit'){
            $scope.createIssueNode(obj);
          } else if (tp === 'cluster' && key != parentId){
            $scope.createClusterNode(obj);
          }
        });
        //Create Edges
        _.each(data, function(obj, key){
          var tp = obj.type;
          if(tp === 'issue' || tp ==='entry' || tp === 'exit'){
            $scope.createEdge(obj.id);
          } else if (tp === 'cluster' && key != parentId){
            $scope.createEdge(obj.id);
          } 
        });

        if(Object.keys(data).length > 2){
          $scope.renderGraph($scope.g);
          $scope.createClusterNode(data[parentId]);
        } else {
          $scope.createClusterNode(data[parentId]);
          $scope.renderGraph($scope.g);
        }
      } else {
        $scope.g = $scope.createCanvas();
        $scope.createClusterNode(data[1]);
        $scope.renderGraph($scope.g);
      }
    };

    /**
     * Watch the chagne of the data object and rerender the graph
     */
    $scope.$watchCollection('data', function(newVal, oldVal){
      $scope.buildGraph(newVal);
    });
  };


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.graph', [
  	'ngAnimate',
  	'ui.router',

    'cd-app.common'
  ])
  .config(GraphConfig)
  .controller('graphCtrl', GraphCtrl);
})(angular);	