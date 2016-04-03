/**
 * @name openDataHubApp.controller:FiltersController
 * @description Responsible for the handle all the logic for the data filtering
 * @author ogoncalves
 * @date 2016-02-17
 */
angular.module('openDataHubApp').controller('FiltersController', [
  "$scope",
  "$mdDialog",
  "MetadataService",
  function($scope, $mdDialog, MetadataService) {

    // If the user is in the same collection and has previously specified some filters
    // then preserve the filters (do nothing here)
    if (
      $scope.collection &&
      $scope.collection == $scope.search.collection && // is in the same collection
      $scope.filterItems
    ) {
      return;
    } else {
      $scope.collection = $scope.search.collection;
      setFilterItems($scope.metadata.fields);
    }

    /**
     * Responsible for setting up the accordion for the filters apply
     * Receives the collection's fields and builds an object
     * Evaluates the field type and loads the respective filter template
     * @example an Integer field will have a template with 2 numeric inputs (for min and max values)
     * @param {json} fields the data collection fields
     */
    function setFilterItems(fields) {
      $scope.filterItems = [];
      for (var i = 0; i < fields.length; i++) {
        let field = fields[i];
        let json  = {
          'header': field.description,
          'contentTmpl': `js/explorer/views/filters/templates/${field.type}.html`,
          'field': field.field,
          'type': field.type,
          'inputValue': null,
          'visible': true
        };
        $scope.filterItems.push(json);
      }
    }

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.searchData = function() {
      parseFilters();
      $scope.previewDatasetData($scope.search.collection);
      // $mdDialog.hide();
    };


    /**
     * Responsible for check the status of all the fields presented on the filters form. It:
     *  - checks which fields are selected as visible
     *  - checks which fields have filters
     *  - builds a data structure ready to send to the server and retrieve the data for preview
     * @param  {[type]} items [description]
     * @return {[type]}       [description]
     */
    function parseFilters() {
      let fields  = [];
      let filters = [];
      $scope.filterItems.forEach(function(item) {
        // set visible fields
        if (item.visible && !fields[item.field]) {
          fields.push(item.field);
        }

        // set filters for each field
        if (item.inputValue) {
          let filter = {
            field: item.field,
            type: item.type
          };
          if (item.inputValue.min || item.inputValue.max) {
            Object.assign(filter, {
              min: item.inputValue.min,
              max: item.inputValue.max,
            });
          } else if (item.inputValue.length) {
            Object.assign(filter, {val: item.inputValue});
          };

          filters.push(filter);
        }
      });

      $scope.search.fields  = fields;
      $scope.search.filters = filters;
    }
  }
]);
