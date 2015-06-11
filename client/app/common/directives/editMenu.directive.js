/* 
* @Author: cwhwang1986
* @Date:   2015-06-10 15:40:30
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-10 16:35:03
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// ContextMenuDirective
// ---------------------------------------------------------
  var ContextMenuCtrl = function ($scope, $rootScope, GraphService) {
    $scope.graph = GraphService;
    $scope.show = false;
  };

  
  var ContextMenu = function () {
    return {
      restrict: 'E',
      controller: ContextMenuCtrl,
      scope: true,
      template: [
        '<div class="menu">',
        '<li class="edit">Edit</li>',
        '<li class="delete">Delete</li>',
        '</div>'
      ].join('') 
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('contextMenu', ContextMenu);

})(angular);
