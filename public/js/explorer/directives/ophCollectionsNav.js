'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophCollectionsNav', function () {
    return {
      templateUrl: '/js/explorer/views/collectionsNav.html',
      restrict: 'E'
    };
  });
