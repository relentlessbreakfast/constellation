/* 
* @Author: ChalrieHwang
* @Date:   2015-06-14 15:48:11
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-15 11:33:51
*/

'use strict';
(function (angular) {


// ---------------------------------------------------------
// EditMenuDirective - Right click deletion
// ---------------------------------------------------------
  var EditMenuCtrl = function ($scope, GraphService) {
    $scope.graph = GraphService;
    $scope.show = false;
  };

  var link = function($scope, element){
    element.bind('contextmenu', function($event){
      $event.preventDefault();
      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'issue'];
      var nodeId,
          nodeClass,
          promise,
          upNodeId,
          downNodeId;
          
      if (clickObjType === 'circle'){
        nodeId = Number($event.target.__data__);
        nodeClass = $scope.q.node(nodeId).class;
      } else if (clickObjType === 'tspan'){
        nodeId = Number($event.path[4].__data__);
        nodeClass = $scope.q.node(nodeId).class;
      } else if (clickObjType === 'path'){
        upNodeId = Number($event.target.__data__.v);
        downNodeId = Number($event.target.__data__.w);
      } 

      // Pop up window
      var menu1 = [
        {
          title: 'Edit',
          action: function() {
            $scope.$emit('clickEdit', nodeId);
          }
        },
        {
          title: 'Place on graph',
          action: function() {
            $scope.$emit('placeNode', nodeId);
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
                  $scope.graphData = $scope.graph.graphObj.graph;
                  $scope.buildQueue($scope.graphData);
                  // $scope.graph.postGraph();
                }
              }, function(err){
                console.log('error', err);
              });
            }
          }
        }
      ];

      //Append the menu div
      if(clickObjType){
        d3.selectAll('.context-menu').data([1])
          .enter()
          .append('div')
          .attr('class', 'context-menu');
        d3.selectAll('.context-menu').html('');
        var list = d3.selectAll('.context-menu').append('ul');
        if(clickObjType === 'cluster' || clickObjType === 'circle' || clickObjType === 'tspan'){
          list.selectAll('li').data(menu1).enter()
            .append('li')
            .html(function(d) {
              return d.title;
            })
            .on('click', function(d) {
              d.action(d);
              d3.select('.context-menu').style('display', 'none');
            });
        } else if (clickObjType === 'path') {
          list.selectAll('li')
              .data([menu1[1]]).enter()
              .append('li')
              .html(function(d) {
                return d.title;
              })
              .on('click', function(d) {
                d.action(d);
                d3.select('.context-menu').style('display', 'none');
              });
        } else if (clickObjType === 'svg'){
        }
        d3.select('.context-menu')
        .style('left', ($event.pageX - 2) + 'px')
        .style('top', ($event.pageY - 2) + 'px')
        .style('display', 'block');

        //Close the contextmenu once it got clicked 
        d3.select('body').on('click', function() {
          d3.select('.context-menu').style('display', 'none');
        });

        
      }
    });
  };


  var EditMenuDirective = function () {
    return {
      restrict: 'EA',
      controller: EditMenuCtrl,
      link: link,
      scope: true
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('ngEditMenu', EditMenuDirective);

})(angular);
