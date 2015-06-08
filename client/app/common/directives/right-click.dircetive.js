/* 
* @Author: ChalrieHwang
* @Date:   2015-06-05 17:38:31
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-08 11:57:01
*/

  // if(clickObjType === 'path'){
  //       var upNodeId = $event.target.__data__.v;
  //       var downNodeId = $event.target.__data__.w;
  // }
// app.directive('ngRightClick', function($parse) {
//     return function(scope, element, attrs) {
//         var fn = $parse(attrs.ngRightClick);
//         element.bind('contextmenu', function(event) {
//             scope.$apply(function() {
//                 event.preventDefault();
//                 fn(scope, {$event:event});
//             });
//         });
//     };
// });

'use strict';
(function (angular) {

// ---------------------------------------------------------
// RightClickDirective - Right click deletion
// ---------------------------------------------------------
  var RightClickCtrl = function ($scope, GraphService) {
    $scope.graph = GraphService;

  };

  var link = function($scope, element){
    element.bind('contextmenu', function($event){
      $event.preventDefault();

      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'issue'];
      var nodeId,
          nodeClass,
          abbrev,
          promise,
          upNodeId,
          downNodeId;
      if (clickObjType === 'circle'){
        nodeId = $event.target.__data__;
        nodeClass = $scope.g.node(nodeId).class;
        abbrev = $scope.g.node(nodeId).label;
      } else if (clickObjType === 'tspan'){
        nodeId = $event.path[4].__data__;
        nodeClass = $scope.g.node(nodeId).class;
        abbrev = $scope.g.node(nodeId).label;
      } else if (clickObjType === 'path'){
        upNodeId = $event.target.__data__.v;
        downNodeId = $event.target.__data__.w;
      } 
      //Click circle
      if(nodeClasses.indexOf(nodeClass) !== -1){
        if(nodeClass === 'cluster'){
          var clusterId = $scope.g.node(nodeId).clusterId;
          promise = $scope.graph.deleteNode(clusterId);
        } else if (nodeClass === 'issue'){
          promise = $scope.graph.deleteNode(nodeId);
        }
      }
      // if(clickObjType === 'path'){
      //   promise = $scope.graph.deleteEdge(upNodeId, downNodeId);
      // }     
      if(promise){
        promise.then(function(result){
            if(result){
              $scope.data = $scope.graph.graphObj.graph;
              $scope.buildGraph($scope.data);
            }
          }, function(err){
            console.log('error', err);
          });
      }

    });
  };

  var RighClickDirective = function () {
    return {
      restrict: 'A',
      controller: RightClickCtrl,
      link: link,
      scope: true
      // controller: RightClickCtrl
      // template:  [
      //   '<div class="graph">',
      //   '<svg id="canvas" ng-mouseover="mouseOver($event)" ng-right-click="link" ng-dblclick="onGraphDblClick($event)"><g/></svg>',
      //   '</div>'
      // ].join('')
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('ngRightClick', RighClickDirective);

})(angular);
