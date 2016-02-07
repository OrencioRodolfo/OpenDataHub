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
      controller: ["$scope", "$mdMedia", function($scope, $mdMedia) {
        $scope.topDirections       = ['left', 'up'];
        $scope.bottomDirections    = ['down', 'right'];
        $scope.isOpen              = false;
        $scope.availableModes      = ['md-fling', 'md-scale'];
        $scope.selectedMode        = 'md-fling';
        $scope.availableDirections = ['up', 'down', 'left', 'right'];
        $scope.selectedDirection   = 'left';
      }]
    };
  });
