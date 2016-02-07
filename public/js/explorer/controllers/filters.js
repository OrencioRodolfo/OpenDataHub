/**
 * @ngdoc function
 * @name openDataHubApp.controller:ExplorerctrlCtrl
 * @description
 * # ExplorerctrlCtrl
 * Controller of the openDataHubApp
 */
angular.module('openDataHubApp').controller('FiltersCtrl', [
  "$scope",
  "$mdDialog",
  function($scope, $mdDialog) {
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
]);
