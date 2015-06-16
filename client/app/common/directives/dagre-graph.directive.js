/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-16 11:03:00
*/

'use strict';
(function (angular, _) {

// ---------------------------------------------------------
// GraphPanelDirective - dblclick traversion
// ---------------------------------------------------------
  var GraphDirectiveCtrl = function ($scope, D3Service, GraphService) {
    var d3 = D3Service.getD3();
    var dagreD3 = D3Service.getDagreD3();
    var enterId;
    var exitId;
    var parentId;
    var mouseOverId;
    // var previousData;
    /**
    * Define function for double clicks events and re-fetch the data from server
    */
    $scope.onGraphDblClick = function($event){
      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'enter', 'exit'];
      var nodeId,
          nodeClass,
          promise;
      if (clickObjType === 'circle'){
        nodeId = Number($event.target.__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'tspan'){
        nodeId = Number($event.path[4].__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } 
      //click cluster
      if(nodeClasses.indexOf(nodeClass) !== -1){
        var parentCluster = Number($scope.graphData[nodeId].parent_cluster);
        if(nodeClass === 'cluster'){
          var clusterId = Number($scope.g.node(nodeId).clusterId);
          GraphService.saveData(parentCluster, $scope.graphData);
          promise = GraphService.getGraph(clusterId);
        } else {
          var grandparentCluster = $scope.graphData.grandparent_cluster_id;
          if(grandparentCluster){
            GraphService.saveData(parentCluster, $scope.graphData);
            promise = GraphService.getGraph(grandparentCluster);
          } 
        }
        if(promise){
          promise.then(function(result){
              if(result){
                $scope.graphData = GraphService.graphObj.graph;
              }
            }, function(err){
              console.log('error', err);
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
        mouseOverId = Number($event.target.__data__);
      } else if (clickObjType === 'tspan'){
        mouseOverId = Number($event.path[4].__data__);
      }
      if(mouseOverId !== enterId && mouseOverId !== exitId){
        if(clickObjType === 'circle' || clickObjType === 'tspan'){
          $scope.$emit('mouseOver', mouseOverId);
        }
      }
    };
    
    /**
     * Define function for creating the graph canvas object
     * @return {d3} d3 graph object
     */
    var createCanvas = function(){
      var g = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function() { 
          return {}; 
        });
      return g;
    };

    /**
     * Define function for rendering nodes on the graph
     * @param  {d3} canvas d3 graph object
     */
    var renderGraph = function(canvas){
      var render = new dagreD3.render();
      render(d3.select('svg#canvas g'), canvas);
    };

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
      $scope.g.setNode(id, {
        label: text, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.g.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.g.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.g.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.g.node(id).labelName = label;
      if(nodeType === 'issue'){
        $scope.g.node(id).clusterId = jsonObj.cluster_id;
        $scope.g.node(id).description = jsonObj.issue.body;
        $scope.g.node(id).title = jsonObj.issue.title;
        $scope.g.node(id).createAt = jsonObj.issue.created_at || '';
        $scope.g.node(id).updateAt = jsonObj.issue.updated_at || '';
        $scope.g.node(id).closeAt = jsonObj.issue.closed_at || 'In Progress';
        $scope.g.node(id).asignee = jsonObj.issue.assignee;
        $scope.g.node(id).status = jsonObj.issue.state;
        $scope.g.node(id).issueType = jsonObj.issue.labels;
        $scope.g.node(id).url = jsonObj.issue.url;
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
      $scope.g.setNode(id, {
        label: text, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.g.node(id).clusterId = jsonObj.cluster_id;
      $scope.g.node(id).title = jsonObj.cluster.name;
      $scope.g.node(id).description = jsonObj.cluster.description;
      $scope.g.node(id).creator = jsonObj.cluster.creator;
      $scope.g.node(id).childrenCount = jsonObj.cluster.children_count;
      $scope.g.node(id).complete = jsonObj.cluster.children_complete;
      $scope.g.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.g.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.g.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.g.node(id).labelName = label;
    };

    /**
     * Define function to setup all edges of the node
     * @param  {d3} canvas d3 graph object
     * @param  {number} id     The id of node
     */
    var createEdge = function(id){
      if(id){
        if($scope.g.node(id).downstreams){
          $scope.g.node(id).downstreams.forEach(function(downstreamID){
            $scope.g.setEdge(id, downstreamID, {lineInterpolate: 'basis', 
              arrowheadStyle: 'fill: #f7f7f7', arrowhead: 'vee'});
          });
        }
      }
    };

    /**
      * Define function to draw the final graph
     */
    $scope.buildGraph = function(data){
      $scope.g = createCanvas();
      //Track parent enter, exit
      parentId = Number(data.parent_cluster);
      enterId = Number(data.enter);
      exitId = Number(data.exit);
      //Create Nodes
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(obj.cluster_id){
          abbrev = obj.cluster.abbrev;
        }
        if(tp === 'enter' || tp === 'exit'){
          createIssueNode(obj);
          //Prevent adding parent obj to graph
        } else if(tp === 'issue') {
          if(obj.upstream_nodes.length > 0){
            createIssueNode(obj);
          } 
          if(obj.downstream_nodes.length > 0){
            createIssueNode(obj);
          }
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          if(obj.upstream_nodes.length > 0){
            createClusterNode(obj);
          } 
          if(obj.downstream_nodes.length > 0){
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
          createEdge(obj.id);
          //Prevent adding parent obj to graph
        } else if(tp === 'issue') {
          if(obj.upstream_nodes.length > 0){
            createEdge(obj.id);
          } 
          if(obj.downstream_nodes.length > 0){
            createEdge(obj.id);
          }
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          if(obj.upstream_nodes.length > 0){
            createEdge(obj.id);
          } 
          if(obj.downstream_nodes.length > 0){
            createEdge(obj.id);
          }
        }
      });
      //Draw the graph
      renderGraph($scope.g);
      // create the rest of the nodes
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(tp === 'issue') {
          createIssueNode(obj);
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          createClusterNode(obj);
        }
      });
      //Create Edges
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(obj.cluster_id){
          abbrev = obj.cluster.abbrev;
        }
        if(tp === 'issue'){
          createEdge(obj.id);
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          createEdge(obj.id);
        } 
      });

      //Remove empty tag
      d3.select('.edgeLabels').remove();
      //reset the circle radius
      d3.selectAll('svg#canvas g circle')
        .attr('r',40);
      //Add label to each node
      var tspan = d3.selectAll('svg#canvas tspan')[0];
      tspan.forEach(function(text){
        var id = Number(text.__data__);
        var label = $scope.g.node(id).labelName;
        text.innerHTML = label;
      });
      if(d3.selectAll('svg#canvas g.label g')[0][0]){
        var shiftY = d3.selectAll('svg#canvas g.label g')[0][0].transform.animVal[0].matrix.f;
        d3.selectAll('svg#canvas text')
          .attr('text-anchor', 'middle');
        d3.selectAll('svg#canvas g.label g')
          .attr('transform','translate(' + 0 + ',' + shiftY +')');
      }

      var svg = d3.select('svg#canvas');
      var inner = svg.select('g');
      $scope.$parent.size = [inner[0][0].getBBox().width, 
        inner[0][0].getBBox().height];
    };


    $scope.graphData = {};
    $scope.$on('newGraphDw',function(e,d){
      $scope.graphData = d;
      var skipKeys = ['deleted', 'enter', 'exit', 'parent_cluster_id','grandparent_cluster_id'];
      if($scope.graphData){
        _.each($scope.graphData, function(obj, key){
          if(skipKeys.indexOf(key) === -1 ){
            if(!obj.upstream_nodes){
              obj.upstream_nodes = [];
            }
            if(!obj.downstream_nodes){
              obj.downstream_nodes = [];
            }
          }
        });
      }
      $scope.buildGraph($scope.graphData);
    });
    /**
      * Define function initialte the graph
     */
    $scope.init = function(){
      var promise;
      promise = GraphService.getGraph(1);
      if(promise){
        promise.then(function(result){
          if(result){
            $scope.graphData = _.extend($scope.graphData, GraphService.graphObj.graph);
          }
        }, function(err){
          console.log('error', err);
        });
      }
    };
    $scope.init();

    /**
     * Watch the data changes and re-render the graph
     */
    $scope.$watchCollection('graphData', function(newVal){
      var skipKeys = ['deleted', 'enter', 'exit', 'parent_cluster_id', 'grandparent_cluster_id'];
      if(newVal){
        _.each(newVal, function(obj, key){
          if(skipKeys.indexOf(key) === -1 ){
            if(!obj.upstream_nodes){
              obj.upstream_nodes = [];
            }
            if(!obj.downstream_nodes){
              obj.downstream_nodes = [];
            }
          }
        });
        $scope.buildGraph(newVal);
        $scope.$emit('newGraph', newVal);
        return;
      }
    });
  };


  var GraphDirective = function () {
    return {
      restrict: 'E',
      scope: true,
      controller: GraphDirectiveCtrl,
      template:  [
        '<div class="graph">',
        '<svg id="canvas" ng-mouseover="mouseOver($event)" ng-dblclick="onGraphDblClick($event)" ng-right-click><g/>',
        '</svg>',
        '</div>'
      ].join('')
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('dagreGraphPanel', GraphDirective);

})(angular, _);
