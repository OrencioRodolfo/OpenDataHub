'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophExplorerSideNav', function () {
    return {
      templateUrl: '/js/explorer/views/sideNav.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', '$mdMedia', function($scope, $mdMedia) {

      }]
    };
  });
