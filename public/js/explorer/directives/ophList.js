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
      link: function postLink(scope, element, attrs) {
        // element.text('this is the ophExploreList directive');
      }
    };
  });
