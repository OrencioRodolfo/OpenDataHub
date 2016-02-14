(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:mainNavigation
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophAccordion', ['$timeout', function ($timeout) {
  return {
    templateUrl: '/js/common/views/accordion.html',
    restrict: 'E',
    scope: {
      items: "=?"
    },
    controller: ['$scope', function ($scope) {
      $scope.items = [{ 'header': 'Header', 'contentTmpl': 'js/common/views/test.html' }, { 'header': 'Header', 'contentTmpl': 'js/common/views/test.html' }, { 'header': 'Header', 'contentTmpl': 'js/common/views/test.html' }, { 'header': 'Header', 'contentTmpl': 'js/common/views/test.html' }, { 'header': 'Header', 'contentTmpl': 'js/common/views/test.html' }];
    }],
    link: function link(scope, element, attrs) {
      $timeout(function () {
        // guarantee that the DOM is ready so we can bind the click
        $('.accordion-item-js .expand-js').on('click', function () {
          $(this).closest('.accordion-item-js').find('.body-js').slideToggle();
        });
      });
    }
  };
}]);

},{}],2:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:mainNavigation
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophMainNavigation', function () {
  return {
    templateUrl: '/js/common/views/mainNav.html',
    restrict: 'E',
    link: function link(scope, element, attrs) {
      var site_url = $('#site-url').data('site_url');
      scope.links = {
        'explore': site_url + '/datasetExplorer',
        'download': site_url + '/directDownload',
        'about': site_url + '/about',
        'contacts': site_url + '/contacts',
        'login': site_url + '/user/signin'
      };
    }
  };
});

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophHeader', function () {
  return {
    templateUrl: '/js/common/views/header.html',
    restrict: 'E',
    replace: true,
    link: function link(scope, element, attrs) {
      scope.url = "$('#site-url').data('site_url');";
    }
  };
});

},{}],4:[function(require,module,exports){
'use strict';

/**
 * @ngdoc directive
 * @name explorerApp.directive:ophExploreList
 * @description
 * # ophExploreList
 */

angular.module('openDataHubApp').directive('ophMainSideNav', function () {
  return {
    templateUrl: '/js/common/views/sideNav.html',
    restrict: 'E',
    replace: true,
    controller: ['$scope', '$mdMedia', function ($scope, $mdMedia) {}]
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

angular.module('openDataHubApp').directive('ophSubHeader', function () {
  return {
    templateUrl: '/js/common/views/subHeader.html',
    restrict: 'E',
    controller: ['$scope', '$mdSidenav', '$mdMedia', 'UserService', function ($scope, $mdSidenav, $mdMedia, UserService) {
      var site_url = $('#site-url').data('site_url');
      $scope.login_url = site_url + '/user/signin';
      $scope.profile_url = site_url + '/user/profile';
      $scope.sideNavTrigger = !$mdMedia('gt-md');
      $scope.links = {
        'explore': site_url + '/datasetExplorer',
        'download': site_url + '/directDownload',
        'about': site_url + '/about',
        'contacts': site_url + '/contacts',
        'login': site_url + '/user/signin'
      };

      $scope.openLeftNav = function () {
        $mdSidenav('left-nav').toggle();
      };

      $scope.logout = function () {
        UserService.logout();
      };

      function getUser() {
        UserService.getUser().then(function (res) {
          try {
            if (res.status !== 200) throw res.statusText;
            $scope.user = res.data;
          } catch (e) {
            alert(e);
          };
        });
      };

      getUser(); // load user details on page load
    }]
  };
});

},{}],6:[function(require,module,exports){
'use strict';

/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # ExplorerService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp').service('UserService', ["$http", function ($http) {
  var site_url = $('#site-url').data('site_url');

  function getUser() {
    var url = site_url + '/user/details';
    return $http.get(url);
  }

  function logout() {
    var url = site_url + '/user/logout';
    $http.get(url).then(function (res) {
      try {
        if (res.status !== 200) throw res.statusText;
        window.location = '' + site_url;
      } catch (e) {
        alert(e);
      };
    });
  }

  return {
    getUser: getUser,
    logout: logout
  };
}]);

},{}],7:[function(require,module,exports){
'use strict';

var site_url = $('#site-url').data('site_url');

$(function () {
	var site_url = $('#site-url').data('site_url');

	initNavBar();

	$('#errors-container-js').dialog({
		title: 'Error',
		modal: true,
		autoOpen: false,
		width: 600
	});

	$('#success-messages-js').dialog({
		title: 'Success',
		modal: true,
		autoOpen: false,
		width: 600
	});

	/*
  *	blockUI settings
  */
	$.blockUI.defaults.message = $("#slider");
	$.blockUI.defaults.css.border = '0px';
	$.blockUI.defaults.overlayCSS.opacity = '0.1';

	$(document).ajaxStart(function () {
		$.blockUI();
		$("#slider").show();
	});

	$(document).ajaxStop(function () {
		$.unblockUI();
		$("#slider").hide();
	});
	/**/

	/*
  *	spin js settings
  */
	var opts = {
		lines: 10, // The number of lines to draw
		length: 40, // The length of each line
		width: 3, // The line thickness
		radius: 20, // The radius of the inner circle
		corners: 0.8, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#000', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2000, // The z-index (defaults to 2000000000)
		top: 25 // Top position relative to parent in px
	};
	var target = document.getElementById('slider');
	var spinner = new Spinner(opts).spin(target);

	// log out action
	$('.horizontal-nav .log-out-js').on('click', function () {
		$.get(site_url + '/user/logout', function () {
			window.location = site_url + '/index';
		});
	});
});

function initNavBar() {
	var url = window.location.href;
	if (url.indexOf("datasetExplorer") > -1) $('.horizontal-nav .data-consult-js').addClass('active');else if (url.indexOf("about") > -1) $('.horizontal-nav .about-js').addClass('active');else if (url.indexOf("contacts") > -1) $('.horizontal-nav .contacts-js').addClass('active');else if (url.indexOf("signin") > -1) $('.horizontal-nav .signin-js').addClass('active');else if (url.indexOf("directDownload") > -1) $('.horizontal-nav .direct-download-js').addClass('active');
}

function displayErrors(errors) {
	var html = "";
	for (var i = 0; i < errors.length; i++) {
		html += '<p>' + errors[i] + '</p>';
	}$('#errors-container-js').html(html);
	$('#errors-container-js').dialog('open');
}

function successMessages(messages) {
	var html = "";
	for (var i = 0; i < messages.length; i++) {
		html += '<p>' + messages[i] + '</p>';
	}$('#success-messages-js').html(html);
	$('#success-messages-js').dialog('open');
}

},{}]},{},[1,2,3,4,5,6,7]);
