
'use strict';
(function (angular) {

  var LoginCtrl = function ($scope) {
    $scope.test = 'done';
  };

  var LoginConfig = function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'client/app/login/login.tpl.html',
      controller: LoginCtrl
    });
  };

  angular.
    module('cd-app.login', [
      'ngAnimate',
      'ui.router'
    ])
    .config(LoginConfig)
    .controller('loginCtrl', LoginCtrl);

})(angular);
