/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-03 16:11:41
*/

'use strict';
(function (angular) {

  var GraphPanelCtrl = function ($scope) {

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
        ' <h2>This is the graph page!</h2>',
        ' <svg id="canvas"><g/></svg>',
        '</div>'
      ].join(',')
    };
  };


  angular
    .module('cd-app.common')
    .directive('graphPanel', GraphPanelDirective);
})(angular);
