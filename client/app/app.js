/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-11 23:10:13
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
      controller: AppController
    });

    $urlRouterProvider.otherwise('/');
  };

  var AppController = function ($scope) {
    $scope.graphData = null;
    $scope.g = {};
    $scope.rightClickId = 0;

    $scope.$watchCollection('rightClickId', function(newVal, oldVal){
      console.log('app');
      if(newVal !== oldVal){
      console.log('rightClickId');
        $scope.$broadcast('rightClick', {'val' : newVal});
      }
    });


    $scope.$watchCollection('graphData', function(newVal){
      if(newVal){
        console.log('changeGraphApp');
      }
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
      'app-templates'
    ])
    .config(AppConfig)
    .controller('AppController', AppController);

})(angular);
