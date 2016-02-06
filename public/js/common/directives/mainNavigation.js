'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:mainNavigation
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophMainNavigation', function () {
    return {
      templateUrl: '/js/common/views/mainNav.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        let site_url = $('#site-url').data('site_url');
        scope.links = {
          'explore':  `${site_url}/datasetExplorer`,
          'download': `${site_url}/directDownload`,
          'about':    `${site_url}/about`,
          'contacts': `${site_url}/contacts`,
          'login':    `${site_url}/user/signin`,
        };
      }
    };
  });
