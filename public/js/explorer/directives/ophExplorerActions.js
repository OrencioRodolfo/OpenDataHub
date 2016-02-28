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
            // clickOutsideToClose: true,
            fullscreen: true,
            locals: {
              collection: $scope.search.collection
            }
          })
          .then(function(search) {
            console.log("the search object");
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
        };
        // @TODO remove me
        $scope.showFiltersForm();
      }]
    };
  });
