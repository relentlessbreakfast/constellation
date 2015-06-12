/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-11 18:40:44
*/

'use strict';
(function (angular) {

var InfoPanelController = function ($scope) {



  
  console.log('InfoPanelController scope:', $scope.graphData);
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
