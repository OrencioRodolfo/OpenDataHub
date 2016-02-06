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
      templateUrl: '/js/common/views/subHeader.html',
      restrict: 'E',
      controller: ['$scope', '$mdSidenav', '$mdMedia', function($scope, $mdSidenav, $mdMedia) {
        let site_url          = $('#site-url').data('site_url');
        $scope.sideNavTrigger = !$mdMedia('gt-md');
        $scope.links          = {
          'explore':  `${site_url}/datasetExplorer`,
          'download': `${site_url}/directDownload`,
          'about':    `${site_url}/about`,
          'contacts': `${site_url}/contacts`,
          'login':    `${site_url}/user/signin`,
        };

        $scope.openLeftNav = function() {
          $mdSidenav('left-nav').toggle();
        };
      }]
    };
  });
