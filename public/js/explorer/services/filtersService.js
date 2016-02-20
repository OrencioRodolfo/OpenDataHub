/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # FiltersService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp')
  .service('FiltersService', ["$http", function ($http) {
    const site_url = $('#site-url').data('site_url');

    function getMetadata(collection) {
      let url = `${site_url}/datasetExplorer/metadata/${collection}`;
      return $http.get(url);
    }

    return {
      getMetadata
    }
  }]);
