/* 
* @Author: ChalrieHwang
* @Date:   2015-06-16 13:58:32
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-16 17:56:36
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// BarDirective 
// ---------------------------------------------------------
  var link = function($scope, element){
    $scope.$on('progressive', function(event, data){
      d3.select('div.chart').remove();
      d3.select(element[0])
        .append('div').attr('class', 'chart')
        .selectAll('div')
        .data(data).enter()
        .append('div')
        .transition().ease('elastic')
        .style('width', function(d) { return d + '%'; })
        .text(function(d) { return d + '%'; });
      return;
    });
  };


  var BarDirective = function () {
    return {
      restrict: 'E',
      replace: false,
      link: link
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.info-panel')
    .directive('ngBar', BarDirective);

})(angular);
