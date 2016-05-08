/**
 * @ngdoc function
 * @name openDataHubApp.controller:ExplorerCtrl
 * @description
 * The main controller for the data  explorer module
 * Handles tasks like
 * 	- Loading the collection's metadata
 * 	- Loading the collection's data for preview
 *
 * @author ogoncalves
 * @date 2016-03-17
 */
angular.module('openDataHubApp').controller('ExplorerCtrl', [
  "$scope",
  "ExplorerService",
  "MetadataService",
  "$mdToast",
  "$mdSidenav",
  function($scope, ExplorerService, MetadataService, $mdToast, $mdSidenav) {

    /**
     * Private attributes
     */
    const DEFAULT_COLLECTION = 'user_event';
    const async = require('async');
    const _ = require('lodash');

    /**
     * Public attributes
     */
    $scope.metadata = {};
    $scope.mode = 'table'; // or chart
    // $scope.mode = 'chart';
    $scope.data = {
      'headers': [],
      'rows': []
    };
    $scope.search = {
      collection: DEFAULT_COLLECTION,
    };


    // init search params
    _resetSearchParams();

    // on init, load the default collection's data
    $scope.previewDatasetData = previewDatasetData;
    $scope.downloadDatasetData = downloadDatasetData;

    $scope.$watch('search.collection', function(collection) {
      if (_.isEmpty(collection)) return;

      _resetSearchParams();
      previewDatasetData(collection);
    });

    /**
     * @description
     * Responsible for loading the data related to a specific collection being aware of the
     * query filters specified by the user
     * @param {String} collection - the name of the collection to query (by default it will be 'user_event')
     */
    function previewDatasetData() {
      async.parallel(
        [
          // get the headers
          (callback) => {
            // get collection's metadata
            _getCollectionMetadata($scope.search.collection, (metadata) => {
              $scope.metadata = metadata;
              callback();
            });
          }
        ],
        function(err) {
          // get collection's data
          ExplorerService.previewDatasetData($scope.search).then(function(res) {
            try {
              if (res.status !== 200) throw res.statusText;
              $scope.data.rows    = res.data.rows;
              $scope.data.headers = _setDataHeadersForDisplay();
              $scope.data.numRows = res.data.numRows;
            } catch (e) {
              console.log(e);
            };
            _hideExplorerSideNav();
          });
        }
      );
    };

    /**
     * @description
     * Responsible for loading the data related to a specific collection being aware of the
     * query filters specified by the user
     * @param {String} collection - the name of the collection to query (by default it will be 'user_event')
     */
    function downloadDatasetData(extension) {
      ExplorerService.downloadDatasetData($scope.search, extension);
    };

    /**
     * Private methods
     */
    function _hideExplorerSideNav() {
      $mdSidenav('left-nav').close();
    }

    /**
     * @description
     * Responsible for reseting the search parameters
     *
     * @return {json} all the filters for data query
     */
    function _resetSearchParams(){
      $scope.search.groupBy = '';
      $scope.search.fields = []; // an array sustaining the selected fields to be visible on the data preview
      $scope.search.filters = [], // an array sustaining filters for each field
      $scope.search.pagination = { // default pagination settings
        page: 1,
        limit: 10,
      };
    }

    /**
     * @description
     * Responsible for loading all the dataset metadata
     *
     * @return {JSON} all the dataset metadata information (through a callback)
     */
    function _getCollectionMetadata(collection, callback) {
      MetadataService.getMetadata(collection).then(function (res) {
        try {
          if (res.status !== 200) throw res.statusText;
          callback(res.data);
        } catch (e) {
          console.log(e);
        };
      });
    }

    /**
     * @description
     * Responsible for merging the fields returned by the data query (previewDatasetData method)
     * and the fields specified in the collection's metadata, in order to build the
     * data table headers
     */
    function _setDataHeadersForDisplay() {
      const rowFields = Object.keys($scope.data.rows[0]); // the first data row keys in order to check the returned fields
      const collectionFields = $scope.metadata.fields; // the collection's fields specified in the metadata

      const result = _.filter(collectionFields, function(field){
        return (_.indexOf(rowFields, field.field) >= 0);
      });

      return result;
    }
  }]);
