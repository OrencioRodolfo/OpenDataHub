angular.module('openDataHubApp', [
  'ngMaterial',
  'md.data.table',
  'sticky',
  'ui.utils.masks',
  'chart.js'
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('green');
  });
