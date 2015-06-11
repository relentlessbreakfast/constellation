/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-06-13 23:23:35
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
        },
        'queuepanel': {
            templateUrl: 'queuepanel/queue-panel.tpl.html',
            controller: 'QueuePanelController'
        }
      },
      controller: AppController
    });

    $urlRouterProvider.otherwise('/');
  };

  var AppController = function ($scope) {
    $scope.graphData = null;
    $scope.g = {};

    $scope.$on('newGraph', function($event, data){
      $scope.$broadcast('newGraphDown', data);
      return;
    });
    $scope.$on('singleClick', function($event, data){
      $scope.$broadcast('singleClickId', Number(data));
      return;
    });
  };

  angular
    .module('cd-app', [
      'ngAnimate',
      'ui.router',

      'cd-app.common',
      'cd-app.login',
      'cd-app.graph-panel',
      'cd-app.info-panel',
      'cd-app.queue-panel',
      'app-templates'
    ])
    .config(AppConfig)
    .controller('AppController', AppController);

})(angular);
