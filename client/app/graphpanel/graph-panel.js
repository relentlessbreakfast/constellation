/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-13 11:31:31
*/

'use strict';
(function(angular){

  var GraphPanelController = function($scope, D3Service, $window){
    var d3 = D3Service.getD3();
    var svg = d3.select('svg');
    var inner = svg.select('g');
    var xOffset = [$window.innerWidth * 0.45, 20];
    var shrinkRate = 1;

    $scope.canvasWidth = document.getElementsByClassName('graphpanel')[0].offsetWidth;
    $scope.canvasHeight = document.getElementsByClassName('graphpanel')[0].offsetHeight;
    $scope.size = [0, 0];
    $scope.idealHeight = $scope.canvasHeight * 0.9;
    $scope.idealWidth = $scope.canvasWidth * 0.9;

    /**
     * Attach event listener to window size
     */
    $window.addEventListener('resize', function(){
      $scope.canvasWidth = document.getElementsByClassName('graphpanel')[0].offsetWidth;
      $scope.canvasHeight = document.getElementsByClassName('graphpanel')[0].offsetHeight;
      if($scope.canvasWidth * 0.9 > $scope.size[0]){
        xOffset = [0.5 * ($scope.canvasWidth - $scope.size[0]) - 5, 20];
        inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      } else {
        xOffset = [0.5 * ($scope.canvasWidth - $scope.size[0]) - 5, 20];
        var idealGraphWidth = $scope.canvasWidth * 0.9;
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
      xOffset = [0.5 * ($scope.canvasWidth - newVal[0]) - 5, 20];
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
      console.log('scale', scale, 'shrinkRate', shrinkRate);
      if(scale > shrinkRate) {
        shrinkRate = shrinkRate * 1.01;
        scale = shrinkRate;
      }
      inner.attr('transform', 'scale(' + scale + ')');
    });
    // var drag = d3.behavior.drag()
    //      .on('drag', function(d) {
    //          d.x += d3.event.dx;
    //          d.y += d3.event.dy;
    //          d3.select(this).attr('transform', function(d){
    //              return 'translate(' + [ d.x,d.y ] + ')';
    //          });
    //      });
    svg.call($scope.zoom);
    // svg.call(drag);
    d3.select('svg').on('dblclick.zoom', null);
    d3.select('svg').on('mousedown.zoom', null);
  };


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.graph-panel', [
  	'ngAnimate',
  	'ui.router',

    'cd-app.common'
  ])
  .controller('GraphPanelController', GraphPanelController);
})(angular);	





