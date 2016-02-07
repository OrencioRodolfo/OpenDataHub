angular.module('openDataHubApp', ['ngMaterial', 'md.data.table', 'sticky'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('green');
  });
