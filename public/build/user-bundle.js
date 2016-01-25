(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
	var site_url = $('#site-url').data('site_url');

	//submit sign up form or show sign up form
	$('.auth-container-js .sign-up-btn-js').on('click', function(event){
		signUp();
	});

	//process the user login or show log in form
	$('.auth-container-js .log-in-btn-js').on('click', function(event){
		login();
	});

	$('.auth-container-js .pass-recover').on('click', function(event){
		event.preventDefault();
		togglePassRecoverForm();
	});

	//submit log in form
	$('#login-form').on('submit', function(event){
		event.preventDefault();
		login();
	});
	
	//submit sign up form
	$('#sign-up-form').on('submit', function( event ){
		event.preventDefault();
		signUp();
	});

	$('.pass-recover-form-js .btn-cancel-js').on('click', function(){
		togglePassRecoverForm();
	});
	
	$('.pass-recover-form-js .btn-recover-password-js').on('click', function(){
		if (validateRecoveryForm()) {
			recoverPassword();
		}
	});
});

function login(){
	var site_url = $('#site-url').data('site_url');
	if( $('.auth-container-js .sign-in-container-js').is(':visible') ){
		var form = $('#login-form');
		$.post(site_url+'/user/login', form.serialize(), function( response ){
			if( response.errors != undefined )
				displayErrors( response.errors );
			else
				window.location = site_url+"/datasetExplorer";
		}, 'json');
	}else{
		$('.sign-in-container-js').slideDown('medium');
		$('.sign-up-container-js').slideUp('medium');
	}
}

function signUp(){
	var site_url = $('#site-url').data('site_url');
	if( $('.auth-container-js .sign-up-container-js').is(':visible') ){
		if( validateSignUpForm() ){
			$.post(site_url+'/user/saveUser', $('#sign-up-form').serialize(), function( response ){
				if( response.success == 'success' ){
					successMessages(["You've signed up successfully! Please login."]);
					login();
				}else if( response.errors !== "undefined" ){
					displayErrors( response.errors );
				}
			}, 'json');
		}
	}else{
		$('.sign-up-container-js').slideDown('medium');
		$('.sign-in-container-js').slideUp('medium');
	}
}

// registration form validation
function validateSignUpForm(){
	var form 	= $('#sign-up-form');
	var errors 	= [];
	
	// name
	if( form.find('#first-name').val() == "" || form.find('#last-name').val() == "" )
		errors.push('Full name required');
	// email
	if( form.find('#email').val() == "" )
		errors.push('Email required');
	else if( form.find('#email').val() != form.find('#email-confirm').val() )
		errors.push('Email and email confirmation doesn\'t match');
	
	if( form.find('#password').val() == "" )
		errors.push('Password required');
	else if( form.find('#password').val() != form.find('#password-confirm').val() )
		errors.push('Password and password confirmation doesn\'t match');

	if( errors.length > 0 ){
		displayErrors( errors );
		return false;
	}else
		return true;
}

function togglePassRecoverForm () {
	var form = $('.pass-recover-form-js #recover-pwd-form-js');
	$('.pass-recover-form-js').slideToggle();
	form.find(':input').val('');
}

function recoverPassword () {
	var site_url 	= $('#site-url').data('site_url');
	var form 		= $('.pass-recover-form-js #recover-pwd-form-js');
	$.post(site_url+'/user/recoverPassword', form.serialize(), function(response){
		successMessages(["You shall receive an email soon in order recover your password"]);
		togglePassRecoverForm();
	});
}

function validateRecoveryForm () {
	var form = $('#recover-pwd-form-js');
	console.log(form.find('#email-recover-js').val());
	if (form.find('#email-recover-js').val() == "") {
		displayErrors(["You should supply your account's email"]);
		return false;
	}else{
		return true;
	}
}

},{}],2:[function(require,module,exports){
var site_url = $('#site-url').data('site_url');

$(document).on('click', '#account-settings-js .setting-js .edit-setting-js', function(){
	var parent = $(this).closest('.setting-js');
	showSettingsForm(parent);
});

$(document).on('click', '#account-settings-js .setting-js .edit-setting-js', function(){
	var parent = $(this).closest('.setting-js');
	showSettingsForm(parent);
});

$(document).on('click', '#account-settings-js .setting-js .edit-address-setting-js', function(){
	var parent = $(this).closest('.setting-js');
	$(this).hide();
	$.post('/country/getCountries', function(countries){
		$.each(countries, function (i, item) {
			console.log(item);
			parent.find('#country').append($('<option>', { 
				value: item._id,
				text : item.name 
			}));
		});
		showSettingsForm(parent);
	}, 'json');
});

$(document).on('click', '#account-settings-js .btn-cancel-js', function(){
	var parent = $(this).closest('.setting-js');
	parent.removeClass('active-setting');
	parent.find('.settings-form-js').hide();
	
	parent.find('.inline-right-js').css('display', 'inline-block');
	parent.find('.edit-setting-js').show();
	parent.find('.edit-address-setting-js').show();
});

$(document).on('click', '#account-settings-js .btn-save-js', function(){
	var form = $(this).closest('.settings-form-js form');
	if (validateSettingsForm(form)) {
		$.post(site_url+'/user/editSettings', form.serialize(), function(res){
			if( res.success == 'success' ){
				successMessages(["Your data has been saved successfully!"]);
				getProfileInfo();					
			}else if( res.errors !== "undefined" ){
				displayErrors( res.errors );
			}
		}, 'json');
	}
});

$(document).on('click', '.pwd-recovery-container-js .recover-pwd-btn-js', function(){
	recoverPassword();
});

$(document).on('submit', '#pwd-recovery-form-js', function(event){
	event.preventDefault();
	recoverPassword();
});


function validateSettingsForm (form) {
	var errors 	= [];
	if (form.find('#email').val() != form.find('#email-confirm').val()) 
		errors.push('Email and email confirmation doesn\'t match');

	if (form.find('#old-password').val() != "" && form.find('#password').val() == "")
		errors.push('You must specify a password');

	if (form.find('#password').val() != form.find('#password-confirm').val())
		errors.push('Password and password confirmation doesn\'t match');

	if (errors.length > 0 ){
		displayErrors( errors );
		return false;
	}else{
		return true;
	}
}

function showSettingsForm (element) {
	element.addClass('active-setting');
	element.find('.inline-right-js').hide();
	element.find('.edit-setting-js').hide();
	element.find('.settings-form-js').css('display', 'inline-block');
}

function getProfileInfo () {
	$('.profile-container-js .profile-info-js').load(site_url+'/user/getProfileInfo');
}

function recoverPassword () {
	var form 	= $('#pwd-recovery-form-js');
	var errors 	= [];
	if( form.find('#password-js').val() == "" )
		errors.push('Password required');
	else if( form.find('#password-js').val() != form.find('#password-confirm-js').val() )
		errors.push('Password and password confirmation doesn\'t match');

	if (errors.length > 0) {
		displayErrors( errors );
		return false;
	}else{
		$.post(site_url+'/user/changePassword', form.serialize(), function(response){
			if (response.success) {
				successMessages(["You're password has been recovered successfully. Please login!"]);
				setTimeout(function(){
					window.location = site_url+"/index";
				}, 3000);
			}else{
				displayErrors([response.errors]);
			}
		});
	}
}
},{}]},{},[1,2]);
