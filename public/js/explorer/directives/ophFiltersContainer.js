'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophFiltersContainer', function () {
    return {
      templateUrl: 'js/explorer/views/filtersContainer.html',
      restrict: 'E',
      controller: ['$scope', '$mdSidenav', function postLink($scope, $mdSidenav) {
        $scope.close = function () {
          $mdSidenav('right').close();
        };
      }]
    };
  });
