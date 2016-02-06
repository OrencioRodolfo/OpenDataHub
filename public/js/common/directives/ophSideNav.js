'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophMainSideNav', function () {
    return {
      templateUrl: '/js/common/views/sideNav.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', '$mdMedia', function($scope, $mdMedia) {
        
      }]
    };
  });
