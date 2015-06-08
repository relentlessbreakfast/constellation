/* 
* @Author: justinwebb
* @Date:   2015-06-03 15:30:09
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-08 12:02:28
*/

'use strict';
(function (angular, _) {

// ---------------------------------------------------------
// GraphPanelDirective - dblclick traversion
// ---------------------------------------------------------
  var GraphDirectiveCtrl = function ($scope, D3Service, GraphService) {
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
      if(len === 3){
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
        if(tp === 'issue' || tp === 'entry' || tp === 'exit'){
          createIssueNode(obj);
          //Prevent adding parent obj to graph
        } else if (tp === 'cluster' && Number(key) !== parentId){
          createClusterNode(obj);
        }
      });
      //Create Edges
      _.each(data, function(obj, key){
        var tp = obj.type;
        if(tp === 'issue' || tp ==='entry' || tp === 'exit'){
          createEdge(obj.id);
        } else if (tp === 'cluster' && Number(key) !== parentId){
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
      var inner = d3.select('svg g');
      $scope.$parent.size = [inner[0][0].getBBox().width, 
        inner[0][0].getBBox().height];
    };

    $scope.data = dummy;

    /**
     * Watch the data changes and re-render the graph
     */
    $scope.$watchCollection('data', function(newVal){
      $scope.buildGraph(newVal);
    });
  };


  var GraphDirective = function () {
    
    return {
      restrict: 'E',
      scope: {
      },
      // link: link,
      controller: GraphDirectiveCtrl,
      template:  [
        '<div class="graph">',
        '<svg id="canvas" ng-right-click ng-dblclick="onGraphDblClick($event)"><g/></svg>',
        '</div>'
      ].join('')
    };
  };

  //Testing Data
  var dummy = {
    entry: 2,
    parent_cluster: 1,
    1: {
      'id': 1, // PRIMARY KEY
      'type': 'cluster',
      'parent_cluster': null, // foreign key ID from NODES table
      'cluster_id': {
      'id': 1,  // PRIMARY KEY
      'abbrev': 'REPO',  // must be less than 32 chars
      'name': 'Project Root',
      'description': 'Cluster of entire project',
      'endpoints': [2, 3],  // these foreign key IDs for entries in NODES table
      'creator': 1445825  // foreign key ID for entry in USERS table
      }, // foreign key ID from CLUSTERS table
      'issue_id': null, // foreign key ID from ISSUES table
      'upstream_nodes': [], // foreign key ID from NODES table
      'downstream_nodes': [] // foreign key ID from NODES table
    },
    2: {
      'id': 2,// PRIMARY KEY
      'type': 'entry',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': null, // foreign key ID from CLUSTERS table
      'issue_id': null, // foreign key ID from ISSUES table
      'upstream_nodes': null, // foreign key ID from NODES table
      'downstream_nodes': [44,6,55] // foreign key ID from NODES table
    },
    3: {
      'id': 3,// PRIMARY KEY
      'type': 'exit',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': null, // foreign key ID from CLUSTERS table
      'issue_id': null, // foreign key ID from ISSUES table
      'upstream_nodes': [5,7], // foreign key ID from NODES table
      'downstream_nodes': [] // foreign key ID from NODES table
    },
    44: {
      'id': 44,// PRIMARY KEY
      'type': 'issue',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': null, // foreign key ID from CLUSTERS table
      'issue_id': {
        'id': 82639324,
        'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
        'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
        'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
        'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
        'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
        'number': 44,
        'title': 'Add O-auth',
        'user': 1445825,
        'labels': [1],
        'state': 'open',
        'locked': false,
        'assignee': 442978,
        'comments': 0,
        'created_at': '2015-05-30T00:16:35Z',
        'updated_at': '2015-05-30T00:44:37Z',
        'closed_at': null,
        'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
      }, // foreign key ID from ISSUES table
      'upstream_nodes': [2], // foreign key ID from NODES table
      'downstream_nodes': [7] // foreign key ID from NODES table
    },
      55: {
      'id': 55,// PRIMARY KEY
      'type': 'issue',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': null, // foreign key ID from CLUSTERS table
      'issue_id': {
        'id': 82639324,
        'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
        'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
        'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
        'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
        'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
        'number': 55,
        'title': 'Add O-auth',
        'user': 1445825,
        'labels': [1],
        'state': 'open',
        'locked': false,
        'assignee': 442978,
        'comments': 0,
        'created_at': '2015-05-30T00:16:35Z',
        'updated_at': '2015-05-30T00:44:37Z',
        'closed_at': null,
        'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
      }, // foreign key ID from ISSUES table
      'upstream_nodes': [2], // foreign key ID from NODES table
      'downstream_nodes': [66] // foreign key ID from NODES table
    },
    66: {
      'id': 66,// PRIMARY KEY
      'type': 'issue',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': null, // foreign key ID from CLUSTERS table
      'issue_id': {
        'id': 82639324,
        'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
        'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
        'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
        'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
        'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
        'number': 66,
        'title': 'Add O-auth',
        'user': 1445825,
        'labels': [1],
        'state': 'open',
        'locked': false,
        'assignee': 442978,
        'comments': 0,
        'created_at': '2015-05-30T00:16:35Z',
        'updated_at': '2015-05-30T00:44:37Z',
        'closed_at': null,
        'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
      }, // foreign key ID from ISSUES table
      'upstream_nodes': [55], // foreign key ID from NODES table
      'downstream_nodes': [7] // foreign key ID from NODES table
    },
    5: {
      'id': 5,// PRIMARY KEY
      'type': 'cluster',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': {
      'id': 5,  // PRIMARY KEY
      'abbrev': ' CSS ',  // must be less than 32 chars
      'name': 'Cluster-Repo Selection Screen',
      'description': 'Cluster of repo selection related tasks',
      'endpoints': [13, 14],  // these foreign key IDs for entries in NODES table
      'creator': 1445825  // foreign key ID for entry in USERS table
      }, // foreign key ID from CLUSTERS table
      'issue_id': null, // foreign key ID from ISSUES table
      'upstream_nodes': [44,6], // foreign key ID from NODES table
      'downstream_nodes': [3] // foreign key ID from NODES table
    },
    6: {
      'id': 6,// PRIMARY KEY
      'type': 'cluster',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': {
      'id': 6,  // PRIMARY KEY
      'abbrev': 'Testing',  // must be less than 32 chars
      'name': 'Cluster-Database Schema',
      'description': 'Cluster of database schema related tasks',
      'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
      'creator': 1445825  // foreign key ID for entry in USERS table
      }, // foreign key ID from CLUSTERS table
      'issue_id': null, // foreign key ID from ISSUES table
      'upstream_nodes': [2], // foreign key ID from NODES table
      'downstream_nodes': [5,7] // foreign key ID from NODES table
    },
    7: {
      'id': 7,// PRIMARY KEY
      'type': 'issue',
      'parent_cluster': 1, // foreign key ID from NODES table
      'cluster_id': null, // foreign key ID from CLUSTERS table
      'issue_id': {
      'id': 82639733, // PRIMARY KEY
      'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
      'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
      'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
      'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
      'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
      'number': 7,
      'title': 'Make sample graph data',
      'user': 1445825,
      'labels': [6],
      'state': 'open',
      'locked': false,
      'assignee': 1445825,
      'comments': 2,
      'created_at': '2015-05-30T00:18:26Z',
      'updated_at': '2015-05-30T00:43:54Z',
      'closed_at': null,
      'body': 'type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
      }, // foreign key ID from ISSUES table

      'upstream_nodes': [44,6,66], // foreign key ID from NODES table
      'downstream_nodes': [3] // foreign key ID from NODES table
    }
  };

// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular
    .module('cd-app.common')
    .directive('dagreGraphPanel', GraphDirective);

})(angular, _);
