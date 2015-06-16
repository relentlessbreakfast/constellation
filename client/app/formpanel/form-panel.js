/* 
* @Author: cwhwang1986
* @Date:   2015-06-14 17:23:52
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-15 15:36:21
*/

'use strict';
(function (angular, _) {


// ---------------------------------------------------------
// EditMenuDirective - Right click deletion
// ---------------------------------------------------------
  var FormPanelController = function ($scope, GraphService) {
    var editId;
    var type;
    var issueGithubId;
    var abbreviation;
    var name;
    var description;
    var unusedList = ['parent_cluster_id', 'enter', 'exit', 'deleted', 'grandparent_cluster_id'];
    $scope.graph = GraphService;
    $scope.$on('newGraphDown', function(){
      $scope.graphData = arguments[1];
    });
    $scope.$on('edit', function(){
      editId = arguments[1];
      type = $scope.graphData[editId].type;
      if(editId){
        $scope.displayObj = $scope.graphData[editId];
        $scope.showCluster = $scope.graphData[editId].type === 'cluster';
        $scope.abbrevList = [];
        if(type === 'cluster'){
          abbreviation = $scope.graphData[editId].cluster.abbrev;
          name = $scope.graphData[editId].cluster.name;
          description = $scope.graphData[editId].cluster.description;
        } else if (type === 'issue'){
          issueGithubId = $scope.graphData[editId].issue.number_github;
          name = $scope.graphData[editId].issue.titel;
          description = $scope.graphData[editId].issue.body;
        }
        _.each($scope.graphData, function(obj, key){
          if(unusedList.indexOf(key) === -1 && obj.type !== 'exit'){
            if(obj.type === 'cluster'){
              $scope.abbrevList.push({key:obj.cluster.abbrev});
            } else if (obj.type === 'issue'){
              $scope.abbrevList.push({key:obj.issue.number_github});
            } else if (obj.type === 'enter'){
              $scope.abbrevList.push({key:obj.type});
            }
          }
        });
      }
    });
    $scope.list=[];
    $scope.submit = function(){
      $scope.graphData[editId] = $scope.displayObj;
      $scope.graphData[editId] = 
      $scope.$emit('closeForm', $scope.graphData);
    };
    $scope.selectItem = function(){

    };
    $scope.cancel = function(){
      if(type === 'cluster'){
        $scope.graphData[editId].cluster.abbrev = abbreviation;
        $scope.graphData[editId].cluster.name = name;
        $scope.graphData[editId].cluster.description = description;
      } else if (type === 'issue'){
        $scope.graphData[editId].issue.number_github = issueGithubId;
        $scope.graphData[editId].issue.title = name;
        $scope.graphData[editId].issue.body = description;
      }
      $scope.$emit('closeForm');
    };
  };


// ---------------------------------------------------------
// Entry Point
// ---------------------------------------------------------

  angular.module('cd-app.form-panel', [
    'ngAnimate',
    'ui.router',

    'cd-app.common'
  ])
  .controller('FormPanelController', FormPanelController);

})(angular, _);
