'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophExploreList', function () {
    return {
      templateUrl: 'js/explorer/views/partials/_listItems.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.name = "Rodolfo";
        // element.text('this is the ophExploreList directive');
      }
    };
  });
