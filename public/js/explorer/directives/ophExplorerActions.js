'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophExplorerActions', function () {
    return {
      templateUrl: '/js/explorer/views/actions.html',
      restrict: 'E',
      replace: true,
      controller: ["$scope", "$mdMedia", "$mdDialog", function($scope, $mdMedia, $mdDialog) {
        $scope.isOpen       = $mdMedia('gt-sm') ? true: false;
        $scope.selectedMode = 'md-scale';

        /**
         * @description Responsible for opening the filters dialog, attatching to it the
         * FiltersController
         * It provides the collection that shall be queried
         * @return {[type]} [description]
         */
        $scope.showFiltersForm = function() {
          $mdDialog.show({
            controller: 'FiltersController',
            templateUrl: '/js/explorer/views/filters/container.html',
            clickOutsideToClose: true,
            fullscreen: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            locals: {
              search: $scope.search
            }
          })
          .then(function() {
            $scope.previewDatasetData();
          }, function() {
            // dialog canceled
          });
        };

        // @TODO remove me
        $scope.showFiltersForm();
      }]
    };
  });
