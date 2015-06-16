/* 
* @Author: ChalrieHwang
* @Date:   2015-06-13 16:35:59
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-14 15:36:24
*/

'use strict';
(function(angular){

  var QueuePanelController = function($scope, D3Service, $window){
    var d3 = D3Service.getD3();
    var svg = d3.select('svg.queue');
    var inner = svg.select('g');
    var xOffset = [$window.innerWidth * 0.45, 2];
    var shrinkRate = 1;
    $scope.queueWidth = document.getElementsByClassName('queue')[0].offsetWidth;
    $scope.queueHeight = document.getElementsByClassName('queue')[0].offsetHeight;
    $scope.size = [0, 0];
    $scope.idealHeight = $scope.queueHeight * 0.9;
    $scope.idealWidth = $scope.queueWidth * 0.9;

    /**
     * Attach event listener to window size
     */
    $window.addEventListener('resize', function(){
      $scope.queueWidth = document.getElementsByClassName('queue')[0].offsetWidth;
      $scope.queueHeight = document.getElementsByClassName('queue')[0].offsetHeight;
      if($scope.queueWidth * 0.9 > $scope.size[0]){
        xOffset = [0.5 * ($scope.queueWidth - $scope.size[0]) - 5, -10];
        inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      } else {
        xOffset = [0.5 * ($scope.queueWidth - $scope.size[0]) - 5, -10];
        var idealGraphWidth = $scope.queueWidth * 0.9;
        // shrinkRate = (1 - ($scope.size[0] - idealGraphWidth)/$scope.size[0]);
        shrinkRate = idealGraphWidth/$scope.size[0];
        xOffset[0] = xOffset[0] + 0.5 * (1 - shrinkRate) * $scope.size[0];
        inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      } 
    }, true);
    

    //Watch the graph width changes and zoom the graph
    $scope.$watchCollection('size', function(newVal){
      var shrinkRateX = 1;
      var shrinkRateY = 1;
      xOffset = [0.5 * ($scope.queueWidth - newVal[0]) - 5, -10];
      if(newVal[1] >= $scope.idealHeight){
        shrinkRateY = $scope.idealHeight/newVal[1];
      } 
      if (newVal[0] >= $scope.idealWidth) {
        shrinkRateX = $scope.idealWidth/newVal[0];
      } 
      shrinkRate = shrinkRateX >= shrinkRateY ? shrinkRateY : shrinkRateX;
      xOffset[0] = xOffset[0] + 0.5 * (1 - shrinkRate) * newVal[0]; 
      inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
    });

    /**
     * Define event listeners to handle zooming
     * @return {d3} [description]
     */
    $scope.zoom = d3.behavior.zoom().on('zoom', function() {
      var scale = d3.event.scale;
      if(scale > shrinkRate) {
        shrinkRate = shrinkRate * 1.01;
        scale = shrinkRate;
      } else {
        shrinkRate = 100;
      }
      inner.attr('transform', 'scale(' + scale + ')');
    });
  
    svg.call($scope.zoom);
    d3.select('svg.queue').on('dblclick.zoom', null);
  };


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.queue-panel', [
    'ngAnimate',
    'ui.router',

    'cd-app.common'
  ])
  .controller('QueuePanelController', QueuePanelController);
})(angular);  





