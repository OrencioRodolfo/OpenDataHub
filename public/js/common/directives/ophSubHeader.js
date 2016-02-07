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
      controller: ['$scope', '$mdSidenav', '$mdMedia', 'UserService', function($scope, $mdSidenav, $mdMedia, UserService) {
        let site_url          = $('#site-url').data('site_url');
        $scope.login_url      = `${site_url}/user/signin`;
        $scope.profile_url    = `${site_url}/user/profile`;
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

        $scope.logout = function() {
          UserService.logout();
        };

        function getUser() {
          UserService.getUser().then(function(res) {
            try {
              if (res.status !== 200) throw res.statusText;
              $scope.user = res.data;
            } catch (e) {
              alert(e);
            };
          });
        };

        getUser(); // load user details on page load
      }]
    };
  });
