/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-05 13:00:10
*/

'use strict';
(function (angular) {

  var GraphPanelCtrl = function ($scope, GraphService) {
    var graphScope = $scope.$parent;

    $scope.onGraphDblClick = function($event){
      var clickObjType = $event.path[0].tagName;
      var nodeId,
          nodeClass,
          abbrev;

      if(clickObjType === 'path'){
        var upNodeId = $event.target.__data__.v;
        var downNodeId = $event.target.__data__.w;
      } else if (clickObjType === 'circle'){
        nodeId = $event.target.__data__;
        nodeClass = graphScope.g.node(nodeId).class;
        abbrev = graphScope.g.node(nodeId).label;
      } else if (clickObjType === 'tspan'){
        nodeId = $event.path[4].__data__;
        nodeClass = graphScope.g.node(nodeId).class;
        abbrev = graphScope.g.node(nodeId).label;
      } else {
        
      }
      //click cluster node
      if(nodeClass === 'cluster' || abbrev !== 'ROOT'){
        var clusterId = graphScope.g.node(nodeId).clusterId.id;
        var promise = GraphService.getGraph(clusterId);
        promise.then(function(){
            $scope.$parent.data = GraphService.graphObj;
          }, function(err){
            console.log('error');
          });
      //click entry exit nodes
      } else if (nodeClass === 'entry' || nodeClass === 'exit') {
        var parentClusterId = graphScope.g.node(nodeId).parentCluster;
        var promise = GraphService.getGraph(parentClusterId);
        console.log('promise', promise);
        promise.then(function(result){
            $scope.$parent.data = GraphService.graphObj;
          }, function(err){
            console.log('error');
          });
      } 
    };

    $scope.onGraphDblClick = function($event, $q){
      var clickObjType = $event.path[0].tagName;
      var nodeId,
          nodeClass,
          abbrev;
      if(clickObjType === 'path'){
        var upNodeId = $event.target.__data__.v;
        var downNodeId = $event.target.__data__.w;
      } else if (clickObjType === 'circle'){
        nodeId = $event.target.__data__;
        nodeClass = graphScope.g.node(nodeId).class;
        abbrev = graphScope.g.node(nodeId).label;
      } else if (clickObjType === 'tspan'){
        nodeId = $event.path[4].__data__;
        nodeClass = graphScope.g.node(nodeId).class;
        abbrev = graphScope.g.node(nodeId).label;
      } else {
        
      }
      //click cluster
      if(nodeClass === 'cluster'){
        var clusterId = graphScope.g.node(nodeId).clusterId;
        var promise = GraphService.getGraph(clusterId);
        promise.then(function(obj){
            $scope.$parent.data = GraphService.graphObj;
          }, function(err){
            console.log('error');
          });
      //click entry exit
      } else if (nodeClass === 'entry' || nodeClass === 'exit') {
        var parentClusterId = graphScope.g.node(nodeId).parentCluster;
        var promise = GraphService.getGraph(parentClusterId);
        promise.then(function(){
            $scope.$parent.data = GraphService.graphObj;
          }, function(err){
            console.log('error');
          });
      } 
    };
    $scope.mouseOverGraph = function($event){
      var mouseOverObj = $event.target.__data__;
      if(true){
      } ;
    };
  };

  var link = function ($scope, elem, attr) {
    console.log(elem);
  };

  var GraphPanelDirective = function () {
    
    return {
      restrict: 'E',
      scope: {
      },
      link: link,
      controller: GraphPanelCtrl,
      template:  [
        '<div class="graph">',
        '<svg id="canvas" ng-mouseover="mouseOver($event)" ng-dblclick="onGraphDblClick($event)"><g/></svg>',
        '</div>'
      ].join('')
    };
  };


  angular
    .module('cd-app.common')
    .directive('dagreGraphPanel', GraphPanelDirective);
})(angular);
