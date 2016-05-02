'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophList', function () {
    return {
      templateUrl: 'js/explorer/views/listItems.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.paginationOptions = Object.assign({}, $scope.search.pagination, {
          limitOptions: [5, 10, 20, 40, 80, 160, 320],
        });

        $scope.onPaginate = function (page, limit) {
          $scope.search.pagination = {
            page,
            limit,
          };
          $scope.previewDatasetData();
        }
      }]
    };
  });
