/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
*/

'use strict';
(function (angular) {

var InfoPanelController = function ($scope) {
  var infoData,
      mouseOverId;
  $scope.showInfo = true;
  $scope.$on('newGraphDown', function(event, data){
      infoData = data;
  });

  $scope.$on('mouseOverId', function(event,data){
    mouseOverId = Number(data);
    renderInfo(mouseOverId);
    return;
  });

  $scope.$on('Edit', function(){
    $scope.showInfo = false;
    return;
  });

  var renderInfo = function(id){
    var objClass = infoData[id].type;
    if(objClass === 'issue'){
      $scope.display = false;
      $scope.displayId = '#'+ infoData[id].issue.number_github;
      $scope.displayTitle = infoData[id].issue.title;
      $scope.displayDescription = infoData[id].issue.body;
      $scope.displayState = infoData[id].issue.state;
      $scope.displayAssignee = infoData[id].issue.assignee;
      $scope.displayIssuetype = infoData[id].issue.labels;
    } else if (objClass === 'cluster'){
      $scope.display = true;
      $scope.displayDescription = infoData[id].cluster.description;
      $scope.displayCount = infoData[id].cluster.children_count;
      $scope.displayComplete =  infoData[id].cluster.children_complete;
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
