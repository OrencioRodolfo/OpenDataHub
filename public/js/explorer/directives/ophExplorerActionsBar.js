'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophExplorerActionsBar', function () {
    return {
      templateUrl: 'js/explorer/views/partials/_explorerActionsBar.html',
      restrict: 'E',
      controller: ['$scope', function postLink($scope) {
        $scope.isOpen = false;
        $scope.demo = {
          isOpen: false,
          count: 0,
          selectedDirection: 'left'
        };
      }]
    };
  });
