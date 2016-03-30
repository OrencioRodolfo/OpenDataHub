/**
 * @ngdoc function
 * @name openDataHubApp.controller:ExplorerctrlCtrl
 * @description
 * # ExplorerctrlCtrl
 * Controller of the openDataHubApp
 */
angular.module('openDataHubApp').controller('ExplorerCtrl', [
  "$scope",
  "ExplorerService",
  "$http",
  "$mdToast",
  "$mdSidenav",
  function($scope, ExplorerService, $http, $mdToast, $mdSidenav) {
    /**
     * Public attributes
     */
    $scope.data   = {
      'headers': [],
      'rows': []
    };
    $scope.mode = 'table'; // or chart

    /**
     * @property {json} search - sustains all the filters for data query
     */
    // reset search filters
    $scope.search = {
      'collection': '',
      'groupBy': 'minute',
      'numRows': '50',
      'fields': [], // an array sustaining the selected fields to be visible on the data preview
      'filters': [] // an array sustaining filters for each field
    };

    /**
     * Public methods
     */
    $scope.previewDatasetData = function(collection='user_event') {
      $scope.search.collection = collection;
      ExplorerService.previewDatasetData($scope.search).then(function(res) {
        try {
          if (res.status !== 200) throw res.statusText;
          $scope.data.headers = res.data.headers;
          $scope.data.rows    = res.data.rows;
          console.log('explorer', $scope.data);
        } catch (e) {
          alert(e);
        };
        hideExplorerSideNav();
      });
    };

    function hideExplorerSideNav() {
      $mdSidenav('left-nav').close();
    }

    // preview data on page load
    $scope.previewDatasetData();
  }]);
