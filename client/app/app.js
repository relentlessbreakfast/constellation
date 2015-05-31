/* 
* @Author: justinwebb
* @Date:   2015-05-22 19:51:08
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-05-30 16:31:38
*/

'use strict';
(function (angular) {

  var AppCtrl = function ($scope) {
    $scope.foo = 'bar';
  };


  angular
    .module('cd-app', [
      'ngAnimate',
      'ui.router',
      
      'cd-app.login'
      
    ])
    .controller('appCtrl', AppCtrl);

})(angular);
