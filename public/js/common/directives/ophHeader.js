'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophHeader', function () {
    return {
      templateUrl: '/js/common/views/partials/_header.html',
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
          scope.url = "$('#site-url').data('site_url');";
      }
    };
  });
