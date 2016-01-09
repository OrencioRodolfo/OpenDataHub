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