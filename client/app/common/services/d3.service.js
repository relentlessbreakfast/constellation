'use strict';
(function (angular) {

  var D3Service = function ($window) {
    return {
      getD3 : function () {
        return $window.d3;
      },
      getDagreD3 : function() {
        return $window.dagreD3;
      }
    };
  };
  angular
    .module('cd-app.common')
    .factory('D3Service', D3Service);

})(angular);
