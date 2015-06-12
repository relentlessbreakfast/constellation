'use strict';
(function (angular) {

  var LoginController = function ($scope) {
    $scope.test = 'done';
  };

  var LoginConfig = function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'login/login.tpl.html',
      controller: LoginController
    });
  };
  angular.
    module('cd-app.login', [
      'ngAnimate',
      'ui.router',

      'cd-app.common'
    ])
    .config(LoginConfig)
    .value('testFunc', 5)
    .controller('LoginController', LoginController);

})(angular);
