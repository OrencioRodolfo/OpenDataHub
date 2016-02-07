'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophFiltersContainer', function () {
    return {
      templateUrl: '/js/explorer/views/filters/container.html',
      restrict: 'E',
      controller: ["$scope", "$mdDialog", "$mdMedia", function($scope, $mdDialog, $mdMedia) {
        $scope.openFromLeft = function() {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Opening from the left')
              .textContent('Closing to the right!')
              .ariaLabel('Left to right demo')
              .ok('Nice!')
              // You can specify either sting with query selector
              .openFrom('#left')
              // or an element
              .closeTo(angular.element(document.querySelector('#right')))
          );
        };
        $scope.openOffscreen = function() {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Opening from offscreen')
              .textContent('Closing to offscreen')
              .ariaLabel('Offscreen Demo')
              .ok('Amazing!')
              // Or you can specify the rect to do the transition from
              .openFrom({
                top: -50,
                width: 30,
                height: 80
              })
              .closeTo({
                left: 1500
              })
          );
        };

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
