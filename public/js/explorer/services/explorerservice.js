/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # ExplorerService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp')
  .service('ExplorerService', ["$http", function ($http) {
    const siteUrl = $('#site-url').data('site_url');

    /**
     * @description Responsible for making http request for retreiving data from a collection,
     * having in account the specified filters
     * @param {json} search all the filters applied for the collection's query
     * @return Promise An promise for handeling the http response
     */
    function previewDatasetData(search) {
      const reqObj = requestBody(search);
      const url    = `${siteUrl}/datasetExplorer/searchDatasetData`;

      return $http.get(url, { params: reqObj });
    }

    function downloadDatasetData(search, fileExtension) {
      search.fileExtension = fileExtension;
      const data = JSON.stringify(requestBody(search));
      const url = `${siteUrl}/datasetExplorer/downloadDatasetFile?params=${data}`;
      window.open(url, '_blank');
    }

    function requestBody(data) {
      const defaultSearch = {
        'collection': '',
        'numRows': '50',
        'fields': [],
        'filters': [],
      };

      return Object.assign({}, defaultSearch, data);
    }

    return {
      previewDatasetData,
      downloadDatasetData,
    };
  }]);
