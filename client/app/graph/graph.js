/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-01 20:35:51
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

  var GraphCtrl = function($scope){
    

    // $scope.init = function(){
    //   $scope.
    // };

    /**
     * Define function for creating the graph canvas object
     * @return {d3} d3 graph object
     */
    $scope.createCanvas = function(){
      var g = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function() { return {}; });
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
      var initialScale = 0.5;
      var width = canvas.graph().width * initialScale;
      $scope.onZoom()
        .translate([(svg.attr('width') - width) / 40 + 30, 20])
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
    $scope.createNode = function(canvas, jsonObj){
      var id = jsonObj.nodeID;
      var label = jsonObj.abbrev;
      var nodeType = jsonObj.nodeType;

      canvas.setNode(id, {
        label: label, 
        class: nodeType,
        shape: 'circle'
      });
      canvas.node(id).name = jsonObj.name;
      canvas.node(id).description = jsonObj.description;
      canvas.node(id).asignee = jsonObj.asignee;
      canvas.node(id).user = jsonObj.user;
      canvas.node(id).parentCluster = jsonObj.parentCluster;
      canvas.node(id).upstreams = jsonObj.upstreams; 
      canvas.node(id).downstreams = jsonObj.downstreams; 
      canvas.node(id).status = jsonObj.status;
      canvas.node(id).issueType = jsonObj.labels;
    };
    /**
     * Define function to setup all edges of the node
     * @param  {d3} canvas d3 graph object
     * @param  {number} id     The id of node
     * @return {[type]}        [description]
     */
    $scope.createEdge = function(canvas, id){
      canvas.node(id).downstreams.forEach(function(downstreamID){
        canvas.setEdge(id, downstreamID, {lineInterpolate: 'basis'});
      });
    };

    $scope.addEdge = function(upstreamID, downstreamID, canvas){
      var entryID = canvas.nodes()[0];
      var exitID = canvas.nodes()[1];
      var downstreamNode = canvas.node(downstreamID);
      var upstreamNode = canvas.node(upstreamID);
      var foundNode;
      var resultUp = false;
      var resultDown = false;
      var traverseUp = function(nodeID, targetID){
        
        if(nodeID === entryID){
          return;
        }
        var list = canvas.node(nodeID).upstreams;
        if(list.hasOwnProperty(targetID)){
          resultUp = true;
          foundNode = targetID;
          return;
        }
        for(var key in list){
          if(!resultUp){
            traverseUp(key, targetID);
          }
        }
      };
      var traverseDown = function(nodeID, targetID){
        
        if(nodeID === exitID){
          return;
        }
        var list = canvas.node(nodeID).downstreams;
        if(list.hasOwnProperty(targetID)){
          resultDown = true;
          foundNode = targetID;
          return;
        }
        for(var key in list){
          if(!resultDown){
            traverseUp(key, targetID);
          }
        }
      };
      var deleteDownStreams = function(upstreamID, downstreamID, canvas){
        var downList = canvas.node(downstreamID).downstreams;
        var updownList = canvas.node(upstreamID).downstreams;
        for(var key in downList){
          if(updownList.hasOwnProperty(key)){
            delete canvas.node(upstreamID).downstreams[key];
            canvas.removeEdge(upstreamID, key);
          }
        }
      };
      //check if dwn's upstream has entry
      if(downstreamNode.upstreams.hasOwnProperty(entryID)){
        delete downstreamNode.upstreams[entryID];
        downstreamNode.upstreams[upstreamID] = true;
      } else {
      //traverse the tree
        for(var nodeID in downstreamNode.upstreams){
          traverseUp(upstreamID, nodeID);     
        }
        if(!resultUp){
          for(var nodeID in downstreamNode.downstreams){
            traverseDown(downstreamID, nodeID);     
          }
        };
        if(!resultUp && !resultDown){
          canvas.setEdge(upstreamID, downstreamID, {lineInterpolate: 'basis'});
          deleteDownStreams(upstreamID, downstreamID,canvas);
          renderGraph(g);
        } else if (resultUp && !resultDown) {
          canvas.setEdge(upstreamID, downstreamID, {lineInterpolate: 'basis'});
          canvas.removeEdge(foundNode, downstreamID);
          canvas.node(downstreamID).upstreams[upstreamID];
          canvas.node(upstreamID).downstreams[downstreamID];
          delete canvas.node(downstreamID).upstreams[foundNode];
          delete canvas.node(foundNode).downstreams[downstreamID];
          deleteDownStreams(upstreamID, downstreamID,canvas);
          renderGraph(g);
        } 
      }
    };
    $scope.createCanvas();
  };


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.graph', [
  	'ngAnimate',
  	'ui.router'
  ])
  .config(GraphConfig)
  .controller('graphCtrl', GraphCtrl);
})(angular);	



