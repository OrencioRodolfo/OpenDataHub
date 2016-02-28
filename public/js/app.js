angular.module('openDataHubApp', ['ngMaterial', 'md.data.table', 'sticky', 'ui.utils.masks'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('green');
  });
