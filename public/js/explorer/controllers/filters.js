/**
 * @name openDataHubApp.controller:FiltersController
 * @description Responsible for the handle all the logic for the data filtering
 * @author ogoncalves
 * @date 2016-02-17
 */
angular.module('openDataHubApp').controller('FiltersController', [
  "$scope",
  "$mdDialog",
  "FiltersService",
  "collection",
  function($scope, $mdDialog, FiltersService, collection) {
    /**
     * @property {json} search - sustains all the filters for data query
     */
    $scope.search = {
      'collection': '',
      'groupBy': 'minute',
      'numRows': '50',
      'fields': [],
      'filters': []
    };


    /**
     * @property {Array} filterItems - sustains all the fields that are possible to filter for a specific data collection
     */
    $scope.filterItems = [];
    
    /**
     * [description]
     * @param  {[type]} function getMetadata(  [description]
     * @return {[type]}          [description]
     */
    (function getMetadata() {
      FiltersService.getMetadata(collection).then(function (res) {
        try {
          if (res.status !== 200) throw res.statusText;
          setFilterItems(res.data.doc.fields);
        } catch (e) {
          console.log(e);
        };
      });
    }());

    /**
     * Responsible for setting up the accordion for the filters apply
     * Receives the collection's fields and builds an object
     * Evaluates the field type and loads the respective filter template
     * @example an Integer field will have a template with 2 numeric inputs (for min and max values)
     * @param {json} fields the data collection fields
     */
    function setFilterItems(fields) {
      for (var i = 0; i < fields.length; i++) {
        let field = fields[i];
        let json  = {
          'header': field.description,
          'contentTmpl': `js/explorer/views/filters/templates/${field.type}.html`,
          'inputValue': null,
          'visible': true
        };
        $scope.filterItems.push(json);
      }
    }

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
