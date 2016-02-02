'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophActionsBar', function () {
    return {
      templateUrl: 'js/explorer/views/partials/_actionsBar.html',
      restrict: 'E'
    };
  });
