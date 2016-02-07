/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # ExplorerService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp')
  .service('UserService', ["$http", function ($http) {
    const site_url = $('#site-url').data('site_url');

    function getUser() {
      const url = `${site_url}/user/details`;
      return $http.get(url);
    }

    function logout() {
      const url = `${site_url}/user/logout`;
      $http.get(url).then(function(res) {
        try {
          if (res.status !== 200) throw res.statusText;
          window.location = `${site_url}`;
        } catch (e) {
          alert(e);
        };
      });
    }

    return {
      getUser,
      logout
    }
  }]);
