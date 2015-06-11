/* 
* @Author: Justin Webb
* @Date:   2015-06-11 13:00:38
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-06-11 15:20:54
*/

'use strict';
(function (angular) {

var InfoPanelConfig = function () {
  
};

var InfoPanelCtrl = function () {
  console.log('InfoPanelCtrl', arguments);
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
