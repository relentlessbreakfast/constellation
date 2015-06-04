/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-03 18:54:01
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
     * @return {[type]}        [description]
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
     * @return {[type]}         [description]
     */
    $scope.createIssueNode = function(jsonObj){
      var id = jsonObj.id;
      var label;
      if(jsonObj.type === 'issue'){
        label = '#' + jsonObj.issue_id.id;
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
     * @return {[type]}         [description]
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
     * @return {[type]}        [description]
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
    };
    
    $scope.buildGraph = function(){
      $scope.g = $scope.createCanvas();
      _.each($scope.data, function(obj, key){
        var tp = obj.type;
        if(tp === 'issue' || tp === 'entry' || tp === 'exit'){
          $scope.createIssueNode(obj);
        } else if (tp === 'cluster' && key !== 'parent_cluster'){
          $scope.createClusterNode(obj);
        }
      });
      _.each($scope.data, function(obj, key){
        var tp = obj.type;
        if(tp === 'issue' || tp ==='entry' || tp === 'exit'){
          $scope.createEdge(obj.id);
        } else if (tp === 'cluster' && key !== 'parent_cluster'){
          $scope.createEdge(obj.id);
        } 
      });
      $scope.renderGraph($scope.g);
    };

    $scope.buildGraph();
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
