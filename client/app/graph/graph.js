/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-03 16:10:59
*/

'use strict';
(function(angular){

  var GraphConfig = function($stateProvider){
    $stateProvider.state('graph',{
      url: '/graph',
      templateUrl: 'graph/graph.tpl.html',
      controller: GraphCtrl
    });
  };

  var GraphCtrl = function($scope, D3Service){
    var d3 = D3Service.getD3();

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
    $scope.createNode = function(jsonObj){
      var id = jsonObj.nodeID;
      var label = jsonObj.abbrev;
      var nodeType = jsonObj.nodeType;
      $scope.g.setNode(id, {
        label: label, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.g.node(id).name = jsonObj.name;
      $scope.g.node(id).description = jsonObj.description;
      $scope.g.node(id).asignee = jsonObj.asignee;
      $scope.g.node(id).user = jsonObj.user;
      $scope.g.node(id).parentCluster = jsonObj.parentCluster;
      $scope.g.node(id).upstreams = jsonObj.upstreams; 
      $scope.g.node(id).downstreams = jsonObj.downstreams; 
      $scope.g.node(id).status = jsonObj.status;
      $scope.g.node(id).issueType = jsonObj.labels;
    };

    /**
     * Define function to setup all edges of the node
     * @param  {d3} canvas d3 graph object
     * @param  {number} id     The id of node
     * @return {[type]}        [description]
     */
    $scope.createEdge = function(id){
      $scope.g.node(id).downstreams.forEach(function(downstreamID){
        $scope.g.setEdge(id, downstreamID, {lineInterpolate: 'basis'});
      });
    };

    //Testing Data
    $scope.data = [
      {
        nodeID : 0,
        abbrev : 'Entry',
        nodeType : 'Entry',
        name : 'Cunstruct Database',
        description : 'Build database with monggose',
        asignee: ['Tony','Tom'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [],
        downstreams : [5,6,8],
        status : 'open',
        labels : 'bug'
      },  
      {
        nodeID : 1,
        abbrev : 'Exit',
        nodeType : 'Exit',
        name : 'Cunstruct Database',
        description : 'Build database with monggose',
        asignee: ['Tony','Tom'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [3,4],
        downstreams : [],
        status : 'open',
        labels : 'bug'
      },
      {
        nodeID : 2,
        abbrev : '2',
        nodeType : 'Issue',
        name : 'Cunstruct Database',
        description : 'Build database with monggose',
        asignee: ['Tony','Tom'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [6,8],
        downstreams : [3],
        status : 'open',
        labels : 'bug'
      },
      {
        nodeID : 3,
        abbrev : '3',
        nodeType : 'Issue',
        name : 'Build Server API',
        description : 'Build server with Express',
        asignee: ['Tom'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [2,7],
        downstreams : [1],
        status : 'open',
        labels : 'bug'
      },
      {
        nodeID : 4,
        abbrev : '4',
        nodeType : 'Issue',
        name : 'Build Client API',
        description : 'Build client app with Angular',
        asignee: ['Brad'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [5,8],
        downstreams : [1],
        status : 'open',
        labels : 'bug'
      },
      {
        nodeID : 5,
        abbrev : '5',
        nodeType : 'Issue',
        name : 'Build Client API',
        description : 'Build client app with Angular',
        asignee: ['Brad'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [0],
        downstreams : [4],
        status : 'open',
        labels : 'bug'
      }, 
      {
        nodeID : 6,
        abbrev : '6',
        nodeType : 'Issue',
        name : 'Build Client API',
        description : 'Build client app with Angular',
        asignee: ['Brad'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [0],
        downstreams : [2,7],
        status : 'open',
        labels : 'bug'
      },
      {
        nodeID : 7,
        abbrev : '7',
        nodeType : 'Issue',
        name : 'Build Client API',
        description : 'Build client app with Angular',
        asignee: ['Brad'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [6],
        downstreams : [3],
        status : 'open',
        labels : 'bug'
      },
      {
        nodeID : 8,
        abbrev : '8',
        nodeType : 'Issue',
        name : 'Build Client API',
        description : 'Build client app with Angular',
        asignee: ['Brad'],
        user : 'Tony',
        parentCluster : null,
        upstreams : [0],
        downstreams : [2,4],
        status : 'open',
        labels : 'bug'
      }
    ];

    $scope.g = $scope.createCanvas();
    $scope.data.forEach(function(ele){
      $scope.createNode(ele);
    });
    $scope.data.forEach(function(ele){
      $scope.createEdge(ele.nodeID);
    });
    $scope.renderGraph($scope.g);
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
