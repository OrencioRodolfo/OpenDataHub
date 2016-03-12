(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @ngdoc function
 * @name openDataHubApp.controller:ExplorerctrlCtrl
 * @description
 * # ExplorerctrlCtrl
 * Controller of the openDataHubApp
 */
angular.module('openDataHubApp').controller('ExplorerCtrl', ["$scope", "ExplorerService", "$http", "$mdToast", "$mdSidenav", function ($scope, ExplorerService, $http, $mdToast, $mdSidenav) {
  /**
   * Public attributes
   */
  $scope.data = {
    'headers': [],
    'rows': []
  };

  /**
   * @property {json} search - sustains all the filters for data query
   */
  // reset search filters
  $scope.search = {
    'collection': '',
    'groupBy': 'minute',
    'numRows': '50',
    'fields': [], // an array sustaining the selected fields to be visible on the data preview
    'filters': [] // an array sustaining filters for each field
  };

  /**
   * Public methods
   */
  $scope.previewDatasetData = function () {
    var collection = arguments.length <= 0 || arguments[0] === undefined ? 'user_event' : arguments[0];

    $scope.search.collection = collection;
    ExplorerService.previewDatasetData($scope.search).then(function (res) {
      try {
        if (res.status !== 200) throw res.statusText;
        $scope.data.headers = res.data.headers;
        $scope.data.rows = res.data.rows;
      } catch (e) {
        alert(e);
      };
      hideExplorerSideNav();
    });
  };

  function hideExplorerSideNav() {
    $mdSidenav('left-nav').close();
  }

  // preview data on page load
  $scope.previewDatasetData();
}]);

},{}],2:[function(require,module,exports){
'use strict';

/**
 * @name openDataHubApp.controller:FiltersController
 * @description Responsible for the handle all the logic for the data filtering
 * @author ogoncalves
 * @date 2016-02-17
 */
angular.module('openDataHubApp').controller('FiltersController', ["$scope", "$mdDialog", "FiltersService", function ($scope, $mdDialog, FiltersService) {
  /**
   * @property {Array} filterItems - sustains all the fields that are possible
   * to filter for a specific data collection
   */

  /**
   * [description]
   * @param  {[type]} function getMetadata(  [description]
   * @return {[type]}          [description]
   */
  (function getMetadata() {
    // If the user is in the same collection and has previously specified some filters
    // then preserve the filters (do nothing here)
    if ($scope.collection && $scope.collection == $scope.search.collection && // is in the same collection
    $scope.filterItems) {
      return;
    }

    $scope.collection = $scope.search.collection;
    FiltersService.getMetadata($scope.search.collection).then(function (res) {
      try {
        if (res.status !== 200) throw res.statusText;
        setFilterItems(res.data.doc.fields);
      } catch (e) {
        console.log(e);
      };
    });
  })();

  /**
   * Responsible for setting up the accordion for the filters apply
   * Receives the collection's fields and builds an object
   * Evaluates the field type and loads the respective filter template
   * @example an Integer field will have a template with 2 numeric inputs (for min and max values)
   * @param {json} fields the data collection fields
   */
  function setFilterItems(fields) {
    $scope.filterItems = [];
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var json = {
        'header': field.description,
        'contentTmpl': 'js/explorer/views/filters/templates/' + field.type + '.html',
        'field': field.field,
        'inputValue': null,
        'visible': true
      };
      $scope.filterItems.push(json);
    }
  }

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.searchData = function () {
    parseFilters();
    $scope.previewDatasetData();
    // $mdDialog.hide();
  };

  /**
   * Responsible for check the status of all the fields presented on the filters form. It:
   *  - checks which fields are selected as visible
   *  - checks which fields have filters
   *  - builds a data structure ready to send to the server and retrieve the data for preview
   * @param  {[type]} items [description]
   * @return {[type]}       [description]
   */
  function parseFilters() {
    var fields = [];
    var filters = [];
    $scope.filterItems.forEach(function (item) {
      // set visible fields
      if (item.visible && !fields[item.field]) {
        fields.push(item.field);
      }

      // set filters for each field
      if (item.inputValue && (item.inputValue.min || item.inputValue.max)) {
        filters.push({
          field: item.field,
          min: item.inputValue.min,
          max: item.inputValue.max
        });
      }
    });

    $scope.search.fields = fields;
    $scope.search.filters = filters;
  }
}]);

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophAccordion
 * @description Provides a template with an accordion, receiving the items (with its header and body contents),
 * and builds an accordion where the user can expand or collapse each one of the items
 * @author ogoncalves
 * @date 2016-03-12
 */
angular.module('openDataHubApp').directive('ophAccordion', ['$timeout', function ($timeout) {
  return {
    templateUrl: '/js/explorer/views/accordion.html',
    restrict: 'E',
    scope: {
      items: "=?"
    },
    link: function link(scope, element, attrs) {
      $timeout(function () {
        // guarantee that the DOM is ready so we can bind the click

        /**
         * Responsible for handling the "click" event on an item's header
         * in order to expand or collapse it
         */
        $('.accordion-item-js .expand-js').on('click', function () {
          var body = $(this).closest('.accordion-item-js').find('.body-js');
          var accordionItem = $(this).closest('.accordion-item-js');
          body.slideToggle();

          if (body.is(':visible')) accordionItem.addClass("expanded");else accordionItem.removeClass("expanded");
        });
      });

      /**
       * Responsible for adding an attribute to the "item" object, specifying
       * if the accordion item has filters or not (@notproud of this watch)
       */
      scope.$watch("items", function (items) {
        if (!items || !items.length) return;

        items.forEach(function (item) {
          if (item.inputValue && (item.inputValue.min || item.inputValue.max)) {
            item.hasFilters = true;
          } else {
            item.hasFilters = false;
          }
        });
      }, true);
    }
  };
}]);

},{}],4:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophCollectionsNav', function () {
  return {
    templateUrl: '/js/explorer/views/collectionsNav.html',
    restrict: 'E'
  };
});

},{}],5:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophExplorerActions', function () {
  return {
    templateUrl: '/js/explorer/views/actions.html',
    restrict: 'E',
    replace: true,
    controller: ["$scope", "$mdMedia", "$mdDialog", function ($scope, $mdMedia, $mdDialog) {
      $scope.isOpen = $mdMedia('gt-sm') ? true : false;
      $scope.selectedMode = 'md-scale';

      /**
       * @description Responsible for opening the filters dialog, attatching to it the
       * FiltersController
       * It provides the collection that shall be queried
       * @return {[type]} [description]
       */
      $scope.showFiltersForm = function () {
        $mdDialog.show({
          controller: 'FiltersController',
          templateUrl: '/js/explorer/views/filters/container.html',
          clickOutsideToClose: true,
          fullscreen: true,
          scope: $scope, // use parent scope in template
          preserveScope: true,
          locals: {
            search: $scope.search
          }
        }).then(function () {
          $scope.previewDatasetData();
        }, function () {
          // dialog canceled
        });
      };

      $scope.showFiltersForm();
    }]
  };
});

},{}],6:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophExplorerSideNav', function () {
  return {
    templateUrl: '/js/explorer/views/sideNav.html',
    restrict: 'E',
    replace: true
  };
});

},{}],7:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophList', function () {
  return {
    templateUrl: 'js/explorer/views/listItems.html',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      // element.text('this is the ophExploreList directive');
    }
  };
});

},{}],8:[function(require,module,exports){
'use strict';

/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # ExplorerService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp').service('ExplorerService', ["$http", function ($http) {

  /**
   * @description Responsible for making http request for retreiving data from a collection,
   * having in account the specified filters
   * @param {json} search all the filters applied for the collection's query
   * @return Promise An promise for handeling the http response
   */
  function previewDatasetData(search) {
    var defaultSearch = {
      'collection': '',
      'groupBy': 'minute',
      'numRows': '50',
      'fields': [],
      'filters': []
    };

    var reqObj = Object.assign({}, defaultSearch, search);
    console.log("The search filters", search);
    console.log("The reqObj", reqObj);
    var siteUrl = $('#site-url').data('site_url');
    var url = siteUrl + '/datasetExplorer/searchDatasetData';

    return $http.post(url, reqObj);
  }

  return {
    previewDatasetData: previewDatasetData
  };
}]);

},{}],9:[function(require,module,exports){
'use strict';

/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # FiltersService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp').service('FiltersService', ["$http", function ($http) {
  var site_url = $('#site-url').data('site_url');

  function getMetadata(collection) {
    var url = site_url + '/datasetExplorer/metadata/' + collection;
    return $http.get(url);
  }

  return {
    getMetadata: getMetadata
  };
}]);

},{}]},{},[1,2,3,4,5,6,7,8,9]);
