/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-11 17:21:27
*/

'use strict';
(function (angular) {

var InfoPanelConfig = function($stateProvider) {
  $stateProvider.state('info',{
    url: '/info',
    templateUrl: 'infopanel/info-panel.tpl.html',
    controller: InfoPanelCtrl
  });
};

var InfoPanelCtrl = function($scope) {
  console.log('InfoPanelCtrl', $scope.$root);
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
  .controller('infoPanelCtrl', InfoPanelCtrl);
})(angular);
