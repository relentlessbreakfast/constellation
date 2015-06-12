/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-11 20:04:04
*/

'use strict';
(function (angular) {

var InfoPanelController = function ($scope) {
  var $scope.nodeId = $scope.rightClickId;
  $scope.$watchCollection('nodeId', function(newVal){
    if(newVal){
      $scope.buildGraph(newVal);
    }
  });
  var renderInfo = function(id){
    var objClass = $scope.g.node(id).class;
    if(nodeClass === 'issue'){
      $scope.displayId = '#'+ $scope.g.node(nodeId).label;
      $scope.displayTitle = $scope.g.node(nodeId).title;
      $scope.displayDescription = $scope.g.node(nodeId).description;
      $scope.displayState = $scope.g.node(nodeId).status;
      $scope.displayAssignee = $scope.g.node(nodeId).asignee;
      $scope.displayIssuetype = $scope.g.node(id).issueType;
    } else if (nodeClass === 'cluster'){
      $scope.display = true;
      $scope.displayId = $scope.g.node(nodeId).abbrev;
      $scope.displayTitle = $scope.g.node(nodeId).title;
      $scope.displayDescription = $scope.g.node(nodeId).description;
      $scope.displayCount = $scope.g.node(nodeId).childrenCount;
      $scope.displayComplete = Number($scope.g.node(nodeId).complete / 
        $scope.displayCount * 100).toFixed(1);
    }

  }
};


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.info-panel', [
    'ngAnimate',
    'ui.router',

    'cd-app.common'
  ])
  .controller('InfoPanelController', InfoPanelController);
})(angular);
