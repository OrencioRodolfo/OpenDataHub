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
      templateUrl: '/js/common/views/partials/_sideNav.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
        let site_url = $('#site-url').data('site_url');
        $scope.links = {
          'explore': `${site_url}/datasetExplorer`,
          'download': `${site_url}/directDownload`,
          'about': `${site_url}/about`,
          'contacts': `${site_url}/contacts`,
          'login': `${site_url}/user/signin`,
        };
        $scope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });
        };
      }]
    };
  });
