/* 
* @Author: cwhwang1986
* @Date:   2015-06-10 15:40:30
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-13 16:52:51
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// queuePanelirective
// ---------------------------------------------------------
  var queuePanelCtrl = function ($scope, $rootScope, GraphService) {
    $scope.graph = GraphService;
    $scope.show = false;
  };

  
  var queuePanelDirective = function () {
    return {
      restrict: 'E',
      controller: queuePanelCtrl,
      scope: true,
      template: [
        '<svg class="queue"><g/>',
        '</svg>',
      ].join('') 
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('queuePanel', queuePanelDirective);

})(angular);
