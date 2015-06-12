/* 
* @Author: ChalrieHwang
* @Date:   2015-06-05 17:38:31
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-11 17:20:46
*/

'use strict';
(function (angular) {


// ---------------------------------------------------------
// RightClickDirective - Right click deletion
// ---------------------------------------------------------
  var RightClickCtrl = function ($scope, GraphService) {
    $scope.graph = GraphService;
    $scope.show = false;
  };

  var link = function($scope, element){

    element.bind('contextmenu', function($event){
      $event.preventDefault();
      console.log('rightclick', $scope.$parent);
      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'issue'];
      var nodeId,
          nodeClass,
          promise,
          upNodeId,
          downNodeId;
      if (clickObjType === 'circle'){
        nodeId = Number($event.target.__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'tspan'){
        nodeId = Number($event.path[4].__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'path'){
        upNodeId = Number($event.target.__data__.v);
        downNodeId = Number($event.target.__data__.w);
      }

      // Pop up window
      var menu = [
        {
          title: 'Edit',
          action: function(elm, d) {
            console.log('elm', elm, 'd', d);
          }
        },
        {
          title: 'Delete',
          action: function() {
            //Click circle
            if(nodeClasses.indexOf(nodeClass) !== -1){
              if(nodeClass === 'cluster'){
                promise = $scope.graph.deleteNode(nodeId);
              } else if (nodeClass === 'issue'){
                promise = $scope.graph.deleteNode(nodeId);
              }
            }
            //Click Path
            if(clickObjType === 'path'){
              promise = $scope.graph.deleteEdge(upNodeId, downNodeId);
            }
            if(promise){
              promise.then(function(result){
                  if(result){
                    $scope.data = $scope.graph.graphObj.graph;
                    $scope.buildGraph($scope.data);
                  }
                }, function(err){
                  console.log('error', err);
                });
            }
          }
        }
      ];


      //Append the menu div
      d3.selectAll('.context-menu').data([1])
        .enter()
        .append('div')
        .attr('class', 'context-menu');


      d3.selectAll('.context-menu').html('');
      var list = d3.selectAll('.context-menu').append('ul');
      list.selectAll('li').data(menu).enter()
        .append('li')
        .html(function(d) {
          return d.title;
        })
        .on('click', function(d) {
          d.action(d);
          d3.select('.context-menu').style('display', 'none');
        });
        d3.select('.context-menu')
        .style('left', ($event.pageX - 2) + 'px')
        .style('top', ($event.pageY - 2) + 'px')
        .style('display', 'block');

      //Close the contextmenu once it got clicked 
      d3.select('body').on('click.context-menu', function() {
        d3.select('.context-menu').style('display', 'none');
      });
    });
  };


  var RighClickDirective = function () {
    return {
      restrict: 'EA',
      controller: RightClickCtrl,
      link: link,
      scope: true
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('ngRightClick', RighClickDirective);

})(angular);
