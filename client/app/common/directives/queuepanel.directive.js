/* 
* @Author: cwhwang1986
* @Date:   2015-06-10 15:40:30
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-13 17:25:48
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// queuePanelirective
// ---------------------------------------------------------
  var queuePanelCtrl = function ($scope) {

    $scope.$on('newGraphDown', function(event, data){
        $scope.g = data;
    });

    /**
     * Define function for rendering queue on the graph
     */
    // var renderQueue = function(canvas){
    //   var render = new dagreD3.render();
    //   render(d3.select('svg.queue g'), canvas);
    // };

    /**
     * Define function for resizing the label showing on the node
     */
    // var reSizeText = function(label){
    //   var labelName = label.slice(0,9);
    //   var len = labelName.length;
    //   if(len === 2){
    //     labelName = '   ' + labelName; 
    //   }else if(len === 3){
    //     labelName = '   ' + labelName; 
    //   } else if (len <= 5){
    //     labelName = '  ' + labelName; 
    //   } else if (len <= 7){
    //     labelName = ' ' + labelName; 
    //   } 
    //   return labelName;
    // };


    /**
      * Define function to draw the final queue
     */
    // $scope.buildQueue = function(data){
    //   //Track parent id
    //   var parentId = data.parent_cluster;
    //   //Create Nodes
    //   _.each(data, function(obj, key){
    //     var tp = obj.type;
    //     var abbrev;
    //     if(obj.cluster_id){
    //       abbrev = obj.cluster.abbrev;
    //     }
    //     if(tp === 'issue' || tp === 'enter' || tp === 'exit'){
    //       createIssueNode(obj);
    //       //Prevent adding parent obj to graph
    //     } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
    //       createClusterNode(obj);
    //     }
    //   });
    //   //Create Edges
    //   _.each(data, function(obj, key){
    //     var tp = obj.type;
    //     var abbrev;
    //     if(obj.cluster_id){
    //       abbrev = obj.cluster.abbrev;
    //     }
    //     if(tp === 'issue' || tp ==='enter' || tp === 'exit'){
    //       createEdge(obj.id);
    //     } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
    //       createEdge(obj.id);
    //     } 
    //   });
    //   //Draw the graph
    //   renderGraph($scope.g);
    //   //Remove empty tag
    //   d3.select('.edgeLabels').remove();
    //   //reset the circle radius
    //   d3.selectAll('circle')
    //     .attr('r',40);
    //   //Add label to each node
    //   var tspan = d3.selectAll('tspan')[0];
    //   tspan.forEach(function(text){
    //     var id = Number(text.__data__);
    //     var label = $scope.g.node(id).labelName;
    //     text.innerHTML = reSizeText(label);
    //     //Offset the label to center of the node
    //     if(label.length % 2 === 0){
    //       var transformTag = text.parentNode.parentNode;
    //       var x = Number(transformTag.transform.animVal[0].matrix.e) + 2;
    //       var y = transformTag.transform.animVal[0].matrix.f; 
    //       transformTag.setAttribute('transform','translate(' + x + ',' + y +')');
    //     }
    //   });
    //   //Add the parent node object to graph object
    //   createClusterNode(data[parentId]);
    //   //Change the graph object size
    //   var svg = d3.select('svg');
    //   var inner = svg.select('g');
    //   $scope.$parent.size = [inner[0][0].getBBox().width, 
    //     inner[0][0].getBBox().height];
    // };



  };

  
  var queuePanelDirective = function () {
    return {
      restrict: 'E',
      controller: queuePanelCtrl,
      scope: true,
      template: [
        '<svg class="queue"><g/>',
        'QUEUE HERE',
        '</svg>',
      ].join('') 
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('queuePanel', queuePanelDirective);

})(angular);
