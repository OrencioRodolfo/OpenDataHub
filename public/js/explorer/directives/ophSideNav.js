'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophSideNav', function () {
    return {
      templateUrl: '/js/explorer/views/partials/_sideNav.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', '$mdMedia', function($scope, $mdMedia) {
        let site_url = $('#site-url').data('site_url');
        $scope.links = {
          'explore':  `${site_url}/datasetExplorer`,
          'download': `${site_url}/directDownload`,
          'about':    `${site_url}/about`,
          'contacts': `${site_url}/contacts`,
          'login':    `${site_url}/user/signin`,
        };
      }]
    };
  });
