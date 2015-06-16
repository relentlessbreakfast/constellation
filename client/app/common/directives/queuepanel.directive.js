/* 
* @Author: cwhwang1986
* @Date:   2015-06-10 15:40:30
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-16 06:43:41
*/

'use strict';
(function (angular) {

// ---------------------------------------------------------
// queuePanelirective
// ---------------------------------------------------------
  var queuePanelCtrl = function ($scope) {
    var enterId;
    var exitId;
    var parentId;
    var hoverId;
    $scope.$on('newGraphDown', function(event, data){
      $scope.buildQueue(data);
    });
    $scope.$on('newGraphDw', function(event, data){
      $scope.buildQueue(data);
    });

    /**
     * Define function for creating the graph canvas object
     * @return {d3} d3 graph object
     */
    var createQueue = function(){
      var g = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function() { 
          return {}; 
        });
      return g;
    };

    /**
     * Define function for rendering queue on the graph
     */
    var renderQueue = function(canvas){
      var render = new dagreD3.render();
      render(d3.select('svg.queue g'), canvas);
    };

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
     * Define function to create node in graph object
     * @param  {d3} canvas  d3 graph object to collect nodes
     * @param  {json} jsonObj node data from server
     */
    var createIssueNode = function(jsonObj){
      var id = Number(jsonObj.id);
      var label;
      if(jsonObj.type === 'issue'){
        label = '#' + jsonObj.issue.number_github;
      } else if(jsonObj.type === 'enter'){
        label = 'Start';
      } else if(jsonObj.type === 'exit'){
        label = 'End';
      }
      var nodeType = jsonObj.type;
      var text = '         ';
      $scope.q.setNode(id, {
        label: text, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.q.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.q.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.q.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.q.node(id).labelName = label;
      if(nodeType === 'issue'){
        $scope.q.node(id).clusterId = jsonObj.cluster_id;
        $scope.q.node(id).description = jsonObj.issue.body;
        $scope.q.node(id).title = jsonObj.issue.title;
        $scope.q.node(id).createAt = jsonObj.issue.created_at || '';
        $scope.q.node(id).updateAt = jsonObj.issue.updated_at || '';
        $scope.q.node(id).closeAt = jsonObj.issue.closed_at || 'In Progress';
        $scope.q.node(id).asignee = jsonObj.issue.assignee;
        $scope.q.node(id).status = jsonObj.issue.state;
        $scope.q.node(id).issueType = jsonObj.issue.labels;
        $scope.q.node(id).url = jsonObj.issue.url;
      }
    };

    /**
     * Define function to create clusterNode in graph object
     * @param  {d3} canvas  d3 graph object to collect nodes
     * @param  {json} jsonObj node data from server
     */
    var createClusterNode = function(jsonObj){
      var id = Number(jsonObj.id);
      var label = jsonObj.cluster.abbrev;
      var nodeType = jsonObj.type;
      var text = '         ';
      $scope.q.setNode(id, {
        label: text, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.q.node(id).clusterId = jsonObj.cluster_id;
      $scope.q.node(id).title = jsonObj.cluster.name;
      $scope.q.node(id).description = jsonObj.cluster.description;
      $scope.q.node(id).creator = jsonObj.cluster.creator;
      $scope.q.node(id).childrenCount = jsonObj.cluster.children_count;
      $scope.q.node(id).complete = jsonObj.cluster.children_complete;
      $scope.q.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.q.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.q.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.q.node(id).labelName = label;
    };

    /**
     * Define function to setup all edges of the node
     * @param  {d3} canvas d3 graph object
     * @param  {number} id     The id of node
     */
    var createEdge = function(id){
      if(id){
        if($scope.q.node(id).downstreams){
          $scope.q.node(id).downstreams.forEach(function(downstreamID){
            $scope.q.setEdge(id, downstreamID, {lineInterpolate: 'basis', 
              arrowheadStyle: 'fill: #f7f7f7', arrowhead: 'vee'});
          });
        }
      }
    };

    /**
    * Define function for mouseover events
    */
    $scope.mouseOver = function($event){
      var clickObjType = $event.path[0].tagName;
      if (clickObjType === 'circle'){
        hoverId = Number($event.target.__data__);
      } else if (clickObjType === 'tspan'){
        hoverId = Number($event.path[4].__data__);
      }
      if(hoverId !== enterId && hoverId !== exitId){
        if(clickObjType === 'circle' || clickObjType === 'tspan'){
          $scope.$emit('mouseOver', hoverId);
        }
      }
    };

    /**
      * Define function to draw the final queue
     */
    $scope.buildQueue = function(data){
      $scope.q = createQueue();
      //Track parent enter, exit
      parentId = Number(data.parent_cluster);
      enterId = Number(data.enter);
      exitId = Number(data.exit);
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(obj.cluster_id){
          abbrev = obj.cluster.abbrev;
        }
        if(tp === 'enter' || tp === 'exit'){
          //Prevent adding parent obj to graph
        } else if(tp === 'issue') {
          if(obj.upstream_nodes.length === 0 && obj.downstream_nodes.length === 0){
            createIssueNode(obj);
          } 
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          if(obj.upstream_nodes.length === 0 && obj.downstream_nodes.length === 0){
            createClusterNode(obj);
          }
        }
      });
      //Create Edges
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(obj.cluster_id){
          abbrev = obj.cluster.abbrev;
        }
        if(tp === 'enter' || tp === 'exit'){
          //Prevent adding parent obj to graph
        } else if(tp === 'issue') {
          if(obj.upstream_nodes.length === 0 && obj.downstream_nodes.length === 0){
            createEdge(obj.id);
          }
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          if(obj.upstream_nodes.length === 0 && obj.downstream_nodes.length === 0){
            createEdge(obj.id);
          } 
        }
      });
      //Draw the graph
      renderQueue($scope.q);
      //Remove empty tag
      d3.select('.edgeLabels').remove();
      //reset the circle radius
      d3.selectAll('svg.queue circle')
        .attr('r',30);
      //Add label to each node
      var tspan = d3.selectAll('svg.queue tspan')[0];
      tspan.forEach(function(text){
        var id = Number(text.__data__);
        var label = $scope.q.node(id).labelName;
        text.innerHTML = label;
        // text.innerHTML = reSizeText(label);
        //Offset the label to center of the node
        // if(label.length % 2 === 0){
        //   var transformTag = text.parentNode.parentNode;
        //   var x = Number(transformTag.transform.animVal[0].matrix.e) + 2;
        //   var y = transformTag.transform.animVal[0].matrix.f; 
        //   transformTag.setAttribute('transform','translate(' + x + ',' + y +')');
        // }
      });
      var shiftY = d3.selectAll('svg.queue g.label g')[0][0].transform.animVal[0].matrix.f;
      d3.selectAll('svg.queue text')
        .attr('text-anchor', 'middle');
      d3.selectAll('svg.queue g.label g')
        .attr('transform','translate(' + 0 + ',' + shiftY +')');
      //Add the parent node object to graph object
      // createClusterNode(data[parentId]);
      //Change the graph object size
      var svg = d3.select('svg.queue');
      var inner = svg.select('g');
      $scope.$parent.size = [inner[0][0].getBBox().width, 
        inner[0][0].getBBox().height];
    };
    


  };

  
  var queuePanelDirective = function () {
    return {
      restrict: 'E',
      controller: queuePanelCtrl,
      scope: true,
      template: [
        '<svg class="queue" ng-mouseOver="mouseOver($event)" ng-edit-menu><g/>',
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
