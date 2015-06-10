/* 
* @Author: ChalrieHwang
* @Date:   2015-06-05 17:38:31
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-10 10:27:16
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// RightClickDirective - Right click deletion
// ---------------------------------------------------------
  var RightClickCtrl = function ($scope, GraphService) {
    $scope.graph = GraphService;
    $scope.show = false;
  };

  var link = function($scope, element){
    element.bind('contextmenu', function($event){
      $event.preventDefault();
      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'issue'];
      var nodeId,
          nodeClass,
          promise,
          upNodeId,
          downNodeId;

      if (clickObjType === 'circle'){
        nodeId = Number($event.target.__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'tspan'){
        nodeId = Number($event.path[4].__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'path'){
        upNodeId = Number($event.target.__data__.v);
        downNodeId = Number($event.target.__data__.w);
      }
      $scope.show = true;
      //Click circle
      if(nodeClasses.indexOf(nodeClass) !== -1){
        if(nodeClass === 'cluster'){
          promise = $scope.graph.deleteNode(nodeId);
        } else if (nodeClass === 'issue'){
          promise = $scope.graph.deleteNode(nodeId);
        }
      }
      //Click Path
      if(clickObjType === 'path'){
        promise = $scope.graph.deleteEdge(upNodeId, downNodeId);
      }
           
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
      restrict: 'EA',
      controller: RightClickCtrl,
      link: link,
      scope: true,
      template: [
        '<g></g>',
        '<div class="menu">',
        '<li>Edit</li>',
        '<li>Delete {{show}}}</li>',
        '</div>'
      ].join('')
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('ngRightClick', RighClickDirective);

})(angular);
