/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-05 15:11:21
*/

'use strict';
(function (angular) {

  var GraphPanelCtrl = function ($scope, GraphService) {
    var graphScope = $scope.$parent;

    $scope.onGraphDblClick = function($event, $q){
      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'entry', 'exit'];
      var nodeId,
          nodeClass,
          abbrev,
          promise;
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
      if(nodeClasses.indexOf(nodeClass) !== -1){
        if(nodeClass === 'cluster'){
          var clusterId = graphScope.g.node(nodeId).clusterId;
          promise = GraphService.getGraph(clusterId);
        } else {
          var parentId = graphScope.g.node(nodeId).parentCluster;
          var parentClusterId = graphScope.g.node(parentId).parentCluster;
          if(parentClusterId === null){
            promise = GraphService.getGraph('root');
          } else {
            promise = GraphService.getGraph(parentClusterId);
          } 
        }
        promise.then(function(obj){
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
