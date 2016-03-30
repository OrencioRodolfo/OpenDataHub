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
      restrict: 'E'
    };
  });
