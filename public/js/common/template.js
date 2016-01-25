var $ = jQuery = require('jquery');
require('jquery-ui');
require('blockUI');
var Spinner = require('spin.js');
require('bootstrap');

var site_url = $('#site-url').data('site_url');

$(function(){
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
	$.blockUI.defaults.message 		= $("#slider");
	$.blockUI.defaults.css.border 	= '0px';
	$.blockUI.defaults.overlayCSS.opacity 	= '0.1';

	$(document).ajaxStart(function(){
		$.blockUI();
		$("#slider").show();
	});

	$(document).ajaxStop(function(){
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
	var target 	= document.getElementById('slider');
	var spinner = new Spinner(opts).spin( target );

	// log out action
	$('.horizontal-nav .log-out-js').on('click', function(){
		$.get(site_url+'/user/logout', function(){
			window.location = site_url+'/index';
		});
	});
});


function initNavBar(){
	var url = window.location.href;
	if (url.indexOf("datasetExplorer") > -1)
		$('.horizontal-nav .data-consult-js').addClass('active');
	else if (url.indexOf("about") > -1)
		$('.horizontal-nav .about-js').addClass('active');
	else if (url.indexOf("contacts") > -1)
		$('.horizontal-nav .contacts-js').addClass('active');
	else if (url.indexOf("signin") > -1)
		$('.horizontal-nav .signin-js').addClass('active');
	else if (url.indexOf("directDownload") > -1)
		$('.horizontal-nav .direct-download-js').addClass('active');
}

function displayErrors(errors){
	var html = "";
	for(var i=0; i<errors.length; i++)
		html += '<p>'+errors[i]+'</p>';
	$('#errors-container-js').html( html );
	$('#errors-container-js').dialog('open');
}

function successMessages(messages){
	var html = "";
	for(var i=0; i<messages.length; i++)
		html += '<p>'+messages[i]+'</p>';
	$('#success-messages-js').html( html );
	$('#success-messages-js').dialog('open');
}
