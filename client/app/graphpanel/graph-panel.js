/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-06 16:53:56
*/

'use strict';
(function(angular, window){

  var GraphConfig = function($stateProvider){
    $stateProvider.state('graph',{
      url: '/graph',
      templateUrl: 'graphpanel/graph-panel.tpl.html',
      controller: GraphPanelCtrl
    });
  };

  var GraphPanelCtrl = function($scope, D3Service){
    var d3 = D3Service.getD3();
    var svg = d3.select('svg');
    var inner = svg.select('g');
    var xOffset = [window.innerWidth * 0.45, 40];
    var shrinkRate = 1;

    $scope.windowWidth = window.innerWidth;
    $scope.windowHeight = window.innerHeight;
    $scope.size = [0, 0];
    $scope.idealHeight = $scope.windowHeight * 0.85;

    /**
     * Attach event listener to window size
     */
    window.addEventListener('resize', function(){
      $scope.windowWidth = window.innerWidth;
      $scope.windowHeight = window.innerHeight;
      $scope.idealHeight = $scope.windowHeight * 0.85;
    }, true);
    

    /**
     * Define event listeners to handle zooming
     * @return {d3} [description]
     */
    $scope.onZoom = function(){
      var zoom = d3.behavior.zoom().on('zoom', function() {
            var yOffset = d3.event.translate[1];
            inner.attr('transform', 'translate(' + [xOffset[0], yOffset] + ')'+'scale(' + d3.event.scale + ')');
          });
      svg.call(zoom);
      d3.select('svg').on('dblclick.zoom', null);
      return zoom;
    };

    //Watch the data changes and zoom the graph
    $scope.$watchCollection('size', function(newVal){
      xOffset = [0.5 * ($scope.windowWidth - newVal[0]) - 6, 40];
      if(newVal){
        if(newVal[1] > $scope.idealHeight){
          shrinkRate = $scope.idealHeight/newVal[1];
        } else {
          shrinkRate = 1;
        } 
        inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      }
    });

    //Watch the window changes and move the graph
    $scope.$watchCollection('windowWidth', function(newVal){
      if(newVal){
        if(newVal > $scope.size[0] + 20){
          xOffset = [0.5 * (newVal - $scope.size[0]) - 6, 40];
          inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
        } 
        // inner.attr('transform', 'translate(' + xOffset + ')'+'scale(' + shrinkRate + ')');
      }
    });

    // var graphWidth = document.getElementsByClassName('output')[0].getBBox().width;
    // var graphHeight = document.getElementsByClassName('output')[0].getBBox().height;
    // var graphXoffset = document.getElementsByClassName('output')[0].getBBox().x;
    // var graphYoffset = document.getElementsByClassName('output')[0].getBBox().y;


    $scope.onZoom()
      .translate([xOffset, 40])
      .scale(1);

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
})(angular, window);	





