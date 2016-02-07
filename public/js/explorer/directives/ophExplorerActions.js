'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophExplorerActions', function () {
    return {
      templateUrl: '/js/explorer/views/actions.html',
      restrict: 'E',
      replace: true,
      controller: ["$scope", "$mdMedia", function($scope, $mdMedia) {
        $scope.isOpen       = $mdMedia('gt-sm') ? true: false;
        $scope.selectedMode = 'md-scale';
        // $scope.selectedMode      = 'md-fling';

        $scope.showAdvanced = function(ev) {
          // var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          var useFullScreen = !$mdMedia('gt-sm') ? true : false;
          $mdDialog.show({
            controller: DialogController,
            templateUrl: '/js/explorer/views/filters/test.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };
      }]
    };
  });

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
