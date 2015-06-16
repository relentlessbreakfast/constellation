/* 
* @Author: ChalrieHwang
* @Date:   2015-06-16 13:58:32
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-16 14:30:38
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// BarDirective 
// ---------------------------------------------------------
  var BarCtrl = function ($scope) {
    $scope.$on('mouseOverId', function(){
      $scope.complete = $scope.displayComplete;
      $scope.count = $scope.displayCount;
      return;
    });
  };

  var link = function($scope){
    console.log('1',$scope.displayComplete);
    console.log('2',$scope.displayCount);
    var data = ($scope.complete/$scope.count) * 100;
    console.log('scope', data);
    d3.select('#chart')
      .append('div').attr('class', 'chart')
      .selectAll('div')
      .data(data).enter()
      .append('div')
      .transition().ease('elastic')
      .style('width', function(d) { return d + '%'; })
      .text(function(d) { return d + '%'; });
  };


  var BarDirective = function ($parse) {
    console.log($parse);
    return {
      restrict: 'E',
      controller: BarCtrl,
      replace: true,
      template: '<div id="chart"></div>',
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
