/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-06-11 16:06:30
*/

'use strict';
(function (angular) {

  var AppConfig = function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
      url: '/',
      views: {
        'graphpanel': {
            templateUrl: 'graphpanel/graph-panel.tpl.html',
            controller: 'GraphPanelController'
        },
        'infopanel': {
            templateUrl: 'infopanel/info-panel.tpl.html',
            controller: 'InfoPanelController'
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
    .controller('AppController', AppCtrl);

})(angular);
