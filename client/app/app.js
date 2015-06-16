/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-15 15:55:25
*/

'use strict';
(function (angular) {

  var AppConfig = function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
      url: '/',
      views: {
        'formpanel': {
            templateUrl: 'formpanel/form-panel.tpl.html',
            controller: 'FormPanelController'
        },
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
    $scope.graph = null;
    $scope.g = {};
    $scope.showForm = false;

    $scope.$on('newGraph', function($event, data){
      $scope.graph = data;
      $scope.$broadcast('newGraphDown', data);
      return;
    });
    $scope.$on('mouseOver', function($event, data){
      $scope.$broadcast('mouseOverId', Number(data));
      return;
    });
    $scope.$on('clickEdit', function($event, data){
      $scope.showForm = true;
      $scope.$broadcast('edit', Number(data));
      return;
    });
    $scope.$on('closeForm', function(){
      $scope.showForm = false;
      return;
    });
    $scope.$on('addPredecessor', function($event, data){
      $scope.$broadcast('newGraphDw', data);
      return;
    });
    $scope.$on('delete', function($event, data){
      $scope.$broadcast('newGraphDw', data);
      return;
    });
    $scope.$on('placeNode', function($event, data){
      var entryId =  Number($scope.graph.enter);
      $scope.graph[entryId].downstream_nodes.push(Number(data));
      $scope.graph[data].upstream_nodes.push(entryId);
      $scope.$broadcast('newGraphDw', $scope.graph);
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
      'cd-app.form-panel',
      'app-templates'
    ])
    .config(AppConfig)
    .controller('AppController', AppController);

})(angular);
