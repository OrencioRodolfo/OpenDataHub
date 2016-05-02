angular.module('openDataHubApp', [
  'ngMaterial',
  'md.data.table',
  'sticky',
  'ui.utils.masks',
  'chart.js',
  'angular-loading-bar',
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('green');
  })
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);
