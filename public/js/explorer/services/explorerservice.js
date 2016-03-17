/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # ExplorerService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp')
  .service('ExplorerService', ["$http", function ($http) {

    /**
     * @description Responsible for making http request for retreiving data from a collection,
     * having in account the specified filters
     * @param {json} search all the filters applied for the collection's query
     * @return Promise An promise for handeling the http response
     */
    function previewDatasetData(search) {
      const defaultSearch = {
        'collection': '',
        'groupBy': 'minute',
        'numRows': '50',
        'fields': [],
        'filters': [],
      };

      let reqObj  = Object.assign({}, defaultSearch, search);
      let siteUrl = $('#site-url').data('site_url');
      let url     = `${siteUrl}/datasetExplorer/searchDatasetData`;

      return $http.post(url, reqObj);
    }

    return {
      previewDatasetData
    }
  }]);
