angular.module('openDataHubApp', ['ngMaterial', 'md.data.table'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('green');
  });
