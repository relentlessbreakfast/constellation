/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-04 09:05:27
*/

'use strict';
(function (angular) {

  var GraphPanelCtrl = function ($scope) {
    var graphScope = $scope.$parent;
    $scope.onGraphClick = function($event){
      var clickObj = $event.target.__data__;
      if(graphScope.g.node(clickObj).class === 'cluster'){
        graphScope.buildGraph(graphScope.data);
      } else if (true) {

      }
    };

    $scope.mouseOverGraph = function($event){
      var mouseOverObj = $event.target.__data__;
      if(true){
      } ;
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
        '<svg id="canvas" ng-mouseover="mouseOver($event)" ng-dblclick="onGraphClick($event)"><g/></svg>',
        '</div>'
      ].join('')
    };
  };


  angular
    .module('cd-app.common')
    .directive('dagreGraphPanel', GraphPanelDirective);
})(angular);
