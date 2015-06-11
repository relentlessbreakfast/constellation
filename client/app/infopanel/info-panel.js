/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-13 23:21:35
*/

'use strict';
(function (angular) {

var InfoPanelController = function ($scope) {
  $scope.$on('newGraphDown', function(event, data){
      $scope.g = data;
  });

  $scope.$on('singleClickId', function(event,data){
    $scope.rightClickId = Number(data);
    renderInfo($scope.rightClickId);
    return;
  });

  var renderInfo = function(id){
    var objClass = $scope.g.node(id).class;
    if(objClass === 'issue'){
      $scope.display = false;
      $scope.displayId = '#'+ $scope.g.node(id).label;
      $scope.displayTitle = $scope.g.node(id).title;
      $scope.displayDescription = $scope.g.node(id).description;
      $scope.displayState = $scope.g.node(id).status;
      $scope.displayAssignee = $scope.g.node(id).asignee;
      $scope.displayIssuetype = $scope.g.node(id).issueType;
    } else if (objClass === 'cluster'){
      $scope.display = true;
      $scope.displayDescription = $scope.g.node(id).description;
      $scope.displayCount = $scope.g.node(id).childrenCount;
      $scope.displayComplete =  $scope.g.node(id).complete; 
    }

  };
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
