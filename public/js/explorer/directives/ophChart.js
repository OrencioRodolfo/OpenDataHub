'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophChart', function () {
    return {
      templateUrl: 'js/explorer/views/chart.html',
      restrict: 'E',

      controller: function($scope) {
        // console.log($scope.data);
        //
        // $scope.$watch('data', function(val) {
        //   console.log('val', val);
        // }, true);

        // $scope.labels = setLabels($scope.data.headers, $scope.data.rows);
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];

        // function setLabels(headers, rows) {
        //   const series = [];
        //   for (var i = 0; i < headers.length; i++) {
        //     let header = headers[i];
        //     series.push(header.label);
        //   }
        //
        //   console.log('rows', rows);
        //
        //   const labels = [];
        //   const data = [];
        //   for (let row in rows) {
        //     if (object.hasOwnProperty(row)) {
        //       console.log(row);
        //     }
        //   }
        // }
      }
    };
  });
