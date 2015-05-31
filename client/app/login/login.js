
'use strict';
(function (angular) {

  var LoginCtrl = function ($scope) {
    $scope.test = 'done';
  };
  
  angular.
    module('cd-app.login', [
      'ngAnimate',
      'ui.router'
    ])
    .controller('loginCtrl', LoginCtrl);

})(angular);
