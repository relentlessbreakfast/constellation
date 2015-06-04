/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-04 01:46:05
*/

'use strict';
(function (angular) {

  var GraphPanelCtrl = function ($scope) {
    $scope.onGraphClick = function($event){
      var graphScope = $scope.$parent;
      var clickObj = $event.target.__data__;
      if(graphScope.g.node(clickObj).class === 'cluster'){
        graphScope.buildGraph(graphScope.data);
      } else if (true) {

      }
    };
  };

  var link = function ($scope, elem, attr) {
    console.log('GraphPanelDirective: ', elem);
  };

  var GraphPanelDirective = function () {
    
    return {
      restrict: 'E',
      scope: {
      },
      link: link,
      controller: GraphPanelCtrl,
      template:  [
        '<div class="graph">',
        '<svg id="canvas" ng-mouseover="mouseOver($event)" ng-click="onGraphClick($event)"><g/></svg>',
        '</div>'
      ].join('')
    };
  };


  angular
    .module('cd-app.common')
    .directive('dagreGraphPanel', GraphPanelDirective);
})(angular);
