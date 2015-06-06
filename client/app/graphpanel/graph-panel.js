/* 
* @Author: ChalrieHwang
* @Date:   2015-06-01 17:45:29
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-05 19:37:17
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

  var GraphPanelCtrl = function($scope, D3Service){
    var d3 = D3Service.getD3();
    /**
     * Define event listeners to handle zooming
     * @return {d3} [description]
     */
    $scope.onZoom = function(){
      var svg = d3.select('svg');
      var inner = svg.select('g');
      var zoom = d3.behavior.zoom().on('zoom', function() {
            inner.attr('transform', 'translate(' + d3.event.translate + ')'+'scale(' + d3.event.scale + ')');
          });
      svg.call(zoom);
      return zoom;
    };
  };
// var initialScale = 1.5;
//       var width = canvas.graph().width * initialScale;
//       $scope.onZoom()
//         .translate([(svg.attr('width') - width) / 40 + 70, 20])
//         .scale(initialScale)
//         .event(svg);
//       svg.attr('height', canvas.graph().height * initialScale + 40);

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
