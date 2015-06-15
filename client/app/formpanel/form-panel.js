/* 
* @Author: cwhwang1986
* @Date:   2015-06-14 17:23:52
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-15 11:46:57
*/

'use strict';
(function (angular, _) {


// ---------------------------------------------------------
// EditMenuDirective - Right click deletion
// ---------------------------------------------------------
  var FormPanelController = function ($scope, GraphService) {
    var editId;
    var unusedList = ['parent_cluster', 'enter', 'exit', 'deleted'];
    $scope.graph = GraphService;
    $scope.$on('newGraphDown', function(){
      $scope.graphData = arguments[1];
    });
    $scope.$on('edit', function(){
      editId = arguments[1];
      if(editId){
        $scope.displayObj = $scope.graphData[editId];
        $scope.showCluster = $scope.graphData[editId].type === 'cluster';
        $scope.abbrevList = [];
        _.each($scope.graphData, function(obj, key){
          console.log('here', obj, 'key', key);
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
        console.log('abbrevList', $scope.abbrevList);
      }
    });
    $scope.list=[];
    $scope.submit = function(){
      $scope.graphData[editId] = $scope.displayObj;
      $scope.$emit('closeForm', $scope.graphData);
    };
    $scope.selectItem = function(){
      console.log('selected');
    };
    $scope.cancel = function(){
      $scope.$emit('closeForm', $scope.graphData);
    };

    // $scope.id = 0;
    // $scope.name='Auth';
    // $scope.description='';
    // $scope.assignee='';
    // $scope.dependency=[1,2,3];
    // $scope.status='';
  };

  // var link = function($scope, element){
  // };



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
