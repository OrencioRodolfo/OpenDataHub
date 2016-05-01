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
      controller: function($scope, $filter) {
        $scope.$watch('data', function(data) {
          if (data.headers) {
            $scope.chartData = setSeriesLabels(data.headers, data.rows);
          }
        }, true);

        function setSeriesLabels(headers, rows) {
          let series = [];
          let chartData = {};
          let labels = [];
          let headersObj = {};

          // series
          for (var i = 0; i < headers.length; i++) {
            let header = headers[i];
            headersObj[header.field] = header;

            if (header.type === 'number' && _.indexOf(series, header.label) == -1) {
              series.push(header.label);
              chartData[header.field] = [];
            }
          }

          // labels and data
          for (var i = 0; i < rows.length; i++) {
            const row = rows[i];
            const tmstp = $filter('date')(row.tmstp, 'yyyy-MM-dd');

            // labels
            if (_.indexOf(labels, tmstp) == -1) {
              labels.push(tmstp);
            }

            // data
            const rowData = [];
            _.map(row, function(val, index) {
              const field = headersObj[index];
              if (field && field.type === 'number') {
                chartData[field.field].push(val);
              }
            });
          }

          chartData = _.values(chartData);

          return {
            series,
            labels,
            data: chartData,
          };
        };

      }
    };
  });
