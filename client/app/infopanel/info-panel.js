/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-06-11 17:35:04
*/

'use strict';
(function (angular) {

var InfoPanelConfig = function () {
};

var InfoPanelController = function ($scope) {
  console.log('InfoPanelController scope:', $scope);
};


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.info-panel', [
    'ngAnimate',
    'ui.router',

    'cd-app.common'
  ])
  .config(InfoPanelConfig)
  .controller('InfoPanelController', InfoPanelController);
})(angular);
