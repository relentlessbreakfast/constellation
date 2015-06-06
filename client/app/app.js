/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-08 11:14:26
*/

'use strict';
(function (angular) {

  var AppConfig = function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
      url: '/',
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
      'app-templates'
    ])
    .config(AppConfig)
    .controller('appCtrl', AppCtrl);

})(angular);
