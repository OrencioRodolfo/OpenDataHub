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
