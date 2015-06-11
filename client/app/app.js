/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-06-11 13:25:52
*/

'use strict';
(function (angular) {

  var AppConfig = function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
      url: '/',
      views: {
        'graphpanel': {
            templateUrl: 'graphpanel/graph-panel.tpl.html',
            controller: 'graphPanelCtrl'
        },
        'infopanel': {
            templateUrl: 'infopanel/info-panel.tpl.html',
            controller: 'infoPanelCtrl'
        }
      },
      controller: AppCtrl
    });

    $urlRouterProvider.otherwise('/');
  };

  var AppCtrl = function ($scope) {
    $scope.foo = 'bar';
  };

  angular
    .module('cd-app', [
      'ngAnimate',
      'ui.router',

      'cd-app.common',
      'cd-app.login',
      'cd-app.graph-panel',
      'cd-app.info-panel',
      'app-templates'
    ])
    .config(AppConfig)
    .controller('appCtrl', AppCtrl);

})(angular);
