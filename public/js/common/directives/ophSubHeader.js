'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophSubHeader', function () {
    return {
      template: '<md-toolbar class="short"><div class="md-toolbar-tools"></div></md-toolbar>',
      restrict: 'E'
    };
  });
