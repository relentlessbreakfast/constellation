
'use strict';
(function (angular) {

  var LoginCtrl = function ($scope) {
    $scope.test = 'done';
  };

  var LoginConfig = function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'login/login.tpl.html',
      controller: LoginCtrl
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
    .controller('loginCtrl', LoginCtrl);

})(angular);
