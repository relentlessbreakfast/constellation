/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   ChalrieHwang
* @Last Modified time: 2015-06-09 16:37:44
*/

'use strict';
(function (angular, _) {

// ---------------------------------------------------------
// GraphPanelDirective - dblclick traversion
// ---------------------------------------------------------
  var GraphDirectiveCtrl = function ($scope, $rootScope, D3Service, GraphService) {
    var d3 = D3Service.getD3();
    var dagreD3 = D3Service.getDagreD3();

    /**
    * Define function for double clicks events and modify the scope data
    */
    $scope.onGraphDblClick = function($event){
      var clickObjType = $event.path[0].tagName;
      var nodeClasses = ['cluster', 'entry', 'exit'];
      var nodeId,
          nodeClass,
          promise;
      if (clickObjType === 'circle'){
        nodeId = $event.target.__data__;
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'tspan'){
        nodeId = $event.path[4].__data__;
        nodeClass = $scope.g.node(nodeId).class;
      } 
      //click cluster
      if(nodeClasses.indexOf(nodeClass) !== -1){
        if(nodeClass === 'cluster'){
          var clusterId = $scope.g.node(nodeId).clusterId;
          promise = GraphService.getGraph(clusterId);
        } else {
          var parentId = $scope.g.node(nodeId).parentCluster;
          var parentClusterId = $scope.g.node(parentId).parentCluster;
          if(parentClusterId){
            promise = GraphService.getGraph(parentClusterId);
          } 
        }
        if(promise){
          promise.then(function(result){
              if(result){
                $scope.data = GraphService.graphObj.graph;
              }
            }, function(err){
              console.log('error', err);
            });
        }
      } 
    };

    $scope.onClick = function($event){
      var clickObjType = $event.path[0].tagName;
      var nodeId,
          nodeClass;
      if (clickObjType === 'circle'){
        nodeId = Number($event.target.__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } else if (clickObjType === 'tspan'){
        nodeId = Number($event.path[4].__data__);
        nodeClass = $scope.g.node(nodeId).class;
      } 
      if(nodeClass === 'issue'){
      $scope.display = false;
        $scope.displayId =  'Issue # '+ nodeId;
        $scope.displayTitle = $scope.data[nodeId].issue_id.title;
        $scope.displayState = $scope.data[nodeId].issue_id.state;
      } else if (nodeClass === 'cluster'){
        $scope.display = true;
        $scope.displayId = $scope.data[nodeId].cluster_id.abbrev;
        $scope.displayTitle = $scope.data[nodeId].cluster_id.name;
        $scope.displayDescription = $scope.data[nodeId].cluster_id.description;
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
      render(d3.select('svg g'), canvas);
    };

    /**
     * Define function for resizing the label showing on the node
     */
    var reSizeText = function(label){
      var labelName = label.slice(0,9);
      var len = labelName.length;
      if(len === 2){
        labelName = '   ' + labelName; 
      }else if(len === 3){
        labelName = '   ' + labelName; 
      } else if (len <= 5){
        labelName = '  ' + labelName; 
      } else if (len <= 7){
        labelName = ' ' + labelName; 
      } 
      return labelName;
    };

    /**
     * Define function to create node in graph object
     * @param  {d3} canvas  d3 graph object to collect nodes
     * @param  {json} jsonObj node data from server
     */
    var createIssueNode = function(jsonObj){
      var id = jsonObj.id;
      var label;
      if(jsonObj.type === 'issue'){
        label = '# ' + jsonObj.issue_id.number;
      } else if(jsonObj.type === 'entry'){
        label = 'Start';
      } else {
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
      $scope.g.node(id).clusterId = jsonObj.cluster_id;
      $scope.g.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.g.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.g.node(id).labelName = label;
      if(nodeType === 'issue'){
        $scope.g.node(id).description = jsonObj.issue_id.title;
        $scope.g.node(id).asignee = jsonObj.issue_id.assignee;
        $scope.g.node(id).status = jsonObj.issue_id.state;
        $scope.g.node(id).issueType = jsonObj.issue_id.labels;
        $scope.g.node(id).url = jsonObj.issue_id.url;
      }
    };

    /**
     * Define function to create clusterNode in graph object
     * @param  {d3} canvas  d3 graph object to collect nodes
     * @param  {json} jsonObj node data from server
     */
    var createClusterNode = function(jsonObj){
      var id = jsonObj.id;
      var label = jsonObj.cluster_id.abbrev;
      var nodeType = jsonObj.type;
      var text = '         ';
      $scope.g.setNode(id, {
        label: text, 
        class: nodeType,
        shape: 'circle'
      });
      $scope.g.node(id).clusterId = jsonObj.cluster_id.id;
      $scope.g.node(id).description = jsonObj.cluster_id.description;
      $scope.g.node(id).creator = jsonObj.cluster_id.creator;
      $scope.g.node(id).parentCluster = jsonObj.parent_cluster;
      $scope.g.node(id).upstreams = jsonObj.upstream_nodes; 
      $scope.g.node(id).downstreams = jsonObj.downstream_nodes; 
      $scope.g.node(id).endpoints = jsonObj.cluster_id.endpoints;
      $scope.g.node(id).labelName = label;
    };

    /**
     * Define function to setup all edges of the node
     * @param  {d3} canvas d3 graph object
     * @param  {number} id     The id of node
     */
    var createEdge = function(id){
      if(id){
        $scope.g.node(id).downstreams.forEach(function(downstreamID){
          $scope.g.setEdge(id, downstreamID, {lineInterpolate: 'basis', 
            arrowheadStyle: 'fill: #f7f7f7', arrowhead: 'vee'});
        });
      }
    };

    /**
      * Define function to draw the final graph
     */
    $scope.buildGraph = function(data){
      $scope.g = createCanvas();
      //Track parent id
      var parentId = data.parent_cluster;
      //Create Nodes
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(obj.cluster_id){
          abbrev = obj.cluster_id.abbrev;
        }
        if(tp === 'issue' || tp === 'entry' || tp === 'exit'){
          createIssueNode(obj);
          //Prevent adding parent obj to graph
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          createClusterNode(obj);
        }
      });
      //Create Edges
      _.each(data, function(obj, key){
        var tp = obj.type;
        var abbrev;
        if(obj.cluster_id){
          abbrev = obj.cluster_id.abbrev;
        }
        if(tp === 'issue' || tp ==='entry' || tp === 'exit'){
          createEdge(obj.id);
        } else if (tp === 'cluster' && Number(key) !== parentId && abbrev !== 'ROOT'){
          createEdge(obj.id);
        } 
      });
      //Draw the graph
      renderGraph($scope.g);
      //Remove empty tag
      d3.select('.edgeLabels').remove();
      //reset the circle radius
      d3.selectAll('circle').attr('r',40);
      //Add label to each node
      var tspan = d3.selectAll('tspan')[0];
      tspan.forEach(function(text){
        var id = Number(text.__data__);
        var label = $scope.g.node(id).labelName;
        text.innerHTML = reSizeText(label);
        //Offset the label to center of the node
        if(label.length % 2 === 0){
          var transformTag = text.parentNode.parentNode;
          var x = Number(transformTag.transform.animVal[0].matrix.e) + 4.8;
          var y = transformTag.transform.animVal[0].matrix.f; 
          transformTag.setAttribute('transform','translate('+x+','+y+')');
        }
      });
      //Add the parent node object to graph object
      createClusterNode(data[parentId]);
      //Change the graph object size
      var svg = d3.select('svg');
      var inner = svg.select('g');
      $scope.$parent.size = [inner[0][0].getBBox().width, 
        inner[0][0].getBBox().height];
    };

    /**
      * Define function initialte the graph
     */
    $scope.init = function(){
      var promise;
      promise = GraphService.getGraph(1);
      if(promise){
        promise.then(function(result){
          if(result){
            $scope.data = GraphService.graphObj.graph;
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
    $scope.$watchCollection('data', function(newVal){
      if(newVal){
        $scope.buildGraph(newVal);
      }
    });
  };


  var GraphDirective = function () {
    return {
      restrict: 'E',
      scope: {
      },
      controller: GraphDirectiveCtrl,
      template:  [
        '<div class="graph">',
        '<svg id="canvas" ng-click="onClick($event)" ng-right-click ng-dblclick="onGraphDblClick($event)"><g/>',
        '</svg>',
        '</div>',
        '<div class="information">',
        '<div class="name">',
        '{{displayId}}' + ' ' + '{{displayTitle}}',
        '</div>',
        '<div class="description" ng-show="display">',
        '{{displayDescription}}',
        '</div>',
        '<div class="dependency">',
        '</div>',
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
