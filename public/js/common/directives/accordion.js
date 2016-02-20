'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:mainNavigation
 * @description
 * # ophExploreList
 */
angular.module('openDataHubApp')
  .directive('ophAccordion', ['$timeout', function ($timeout) {
    return {
      templateUrl: '/js/common/views/accordion.html',
      restrict: 'E',
      scope: {
        items: "=?"
      },
      link: function (scope, element, attrs) {
        $timeout(function(){ // guarantee that the DOM is ready so we can bind the click
          $('.accordion-item-js .expand-js').on('click', function() {
            $(this).closest('.accordion-item-js').find('.body-js').slideToggle();
          });
        });
      }
    };
  }]);
