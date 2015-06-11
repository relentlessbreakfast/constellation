/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-10 15:20:05
*/

'use strict';
(function(angular){

  var GraphConfig = function($stateProvider){
    $stateProvider.state('graph',{
      url: '/graph',
      templateUrl: 'graphpanel/graph-panel.tpl.html',
      controller: GraphPanelCtrl
    });
  };

  var GraphPanelCtrl = function($scope, D3Service, $window){
    var d3 = D3Service.getD3();
    var svg = d3.select('svg');
    var inner = svg.select('g');
    var xOffset = [$window.innerWidth * 0.45, 20];
    var shrinkRate = 1;

    $scope.canvasWidth = document.getElementById('canvas').offsetWidth;
    $scope.canvasHeight = document.getElementById('canvas').offsetHeight;
    $scope.size = [0, 0];
    $scope.idealHeight = $scope.canvasHeight * 0.85;
    $scope.idealWidth = $scope.canvasWidth * 0.95;

    /**
     * Attach event listener to window size
     */
    $window.addEventListener('resize', function(){
      $scope.canvasWidth = document.getElementById('canvas').offsetWidth;
      $scope.canvasHeight = document.getElementById('canvas').offsetHeight;
      if($scope.canvasWidth * 0.95 > $scope.size[0]){
        xOffset = [0.5 * ($scope.canvasWidth - $scope.size[0]) - 6, 20];
        inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      } else {
        xOffset = [0.5 * ($scope.canvasWidth - $scope.size[0]) - 6, 20];
        var idealGraphWidth = $scope.canvasWidth * 0.95;
        shrinkRate = (1 - ($scope.size[0] - idealGraphWidth)/$scope.size[0]);
        xOffset[0] = xOffset[0] + 0.5 * (1 - shrinkRate) * $scope.size[0];
        inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      } 
    }, true);
    

    /**
     * Define event listeners to handle zooming
     * @return {d3} [description]
     */
    

    $scope.zoom = d3.behavior.zoom().on('zoom', function() {
        inner.attr('transform', 'translate(' + d3.event.translate + ')'+'scale(' + d3.event.scale + ')');
    });
    svg.call($scope.zoom);
    d3.select('svg').on('dblclick.zoom', null);

    //Watch the graph width changes and zoom the graph
    $scope.$watchCollection('size', function(newVal){
      xOffset = [0.5 * ($scope.canvasWidth - newVal[0]) - 5, 20];
      if(newVal[1] > $scope.idealHeight){
        shrinkRate = $scope.idealHeight/newVal[1];
        xOffset[0] = xOffset[0] + 0.5 * (1 - shrinkRate) * newVal[0]; 
      } else if(newVal[0] > $scope.idealWidth) {
        shrinkRate = $scope.idealWidth/newVal[0];
        xOffset[0] = xOffset[0] + 0.5 * (1 - shrinkRate) * newVal[0]; 
      } 
      inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
    });
  };


// ---------------------------------------------------------
// Module Entry Point
// ---------------------------------------------------------
  angular.module('cd-app.graph-panel', [
  	'ngAnimate',
  	'ui.router',

    'cd-app.common'
  ])
  .config(GraphConfig)
  .controller('graphPanelCtrl', GraphPanelCtrl);
})(angular);	





