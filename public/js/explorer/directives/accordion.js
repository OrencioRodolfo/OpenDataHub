/**
 * @ngdoc directive
 * @name explorerApp.directive:ophAccordion
 * @description Provides a template with an accordion, receiving the items (with its header and body contents),
 * and builds an accordion where the user can expand or collapse each one of the items
 * @author ogoncalves
 * @date 2016-03-12
 */
angular.module('openDataHubApp')
  .directive('ophAccordion', ['$timeout', function ($timeout) {
    return {
      templateUrl: '/js/explorer/views/accordion.html',
      restrict: 'E',
      scope: {
        items: "=?"
      },
      link: function (scope, element, attrs) {
        $timeout(function(){ // guarantee that the DOM is ready so we can bind the click

          /**
           * Responsible for handling the "click" event on an item's header
           * in order to expand or collapse it
           */
          $('.accordion-item-js .expand-js').on('click', function() {
            let body          = $(this).closest('.accordion-item-js').find('.body-js');
            let accordionItem = $(this).closest('.accordion-item-js');
            body.slideToggle();

            if (body.is(':visible'))
              accordionItem.addClass("expanded");
            else
              accordionItem.removeClass("expanded");
          });
        });

        /**
         * Responsible for adding an attribute to the "item" object, specifying
         * if the accordion item has filters or not (@notproud of this watch)
         */
        scope.$watch("items", function(items){
          if (!items || !items.length) return;

          items.forEach(function(item){
            if (item.inputValue && (item.type != 'number' || item.inputValue.min || item.inputValue.max)) {
              item.hasFilters = true;
            } else {
              item.hasFilters = false;
            }
          });
        }, true);
      }
    };
  }]);
