export default class UserCtrl {

  constructor() {}

  signIn (req, res) {
    let mongoose  = require('mongoose');
    let Country_m = mongoose.model('country');

  	Country_m
  		.find()
  		.sort({name: 1}) // DESC order
  		.exec(function(err, countries){
  			res.render('user/authenticationIndex', {countries} );
  		});
  }

  logIn (req, res) {
    let password_hash = require('password-hash');
  	let form          = req.body;
  	let username      = form.username;
  	let password      = form.password;
    let response      = {};

  	mongoose.model('user').findOne({email: username}, function( err, doc ){
  		if (utils.empty(doc)) {
  			response = {'errors' : ['No user with the email '+form.username]};
  		} else if (password_hash.verify( password, doc.password)) {
        req.session.logged_in = true;
        req.session.name      = doc.first_name;
        response              = {'success': 'success'};
      } else {
  			response = {'errors' : ['Incorrect password']}
  		}
  		res.send(response);
  	});
  }
}


  // var mongoose 		= require('mongoose');
  // var password_hash 	= require('password-hash');
  //
  // /*
  //  * GET users listing.
  //  */
  // exports.listUsers = function(req, res){
  // 	var User_m 		= mongoose.model('user');
  // 	var Country_m 	= mongoose.model('country');
  //
  // 	User_m
  // 	.find()
  // 	.populate('address.country', 'name')
  // 	.exec(function( err, user ){
  // 		res.send( user );
  // 	});
  //
  // };
  //
  // // load user registration form
  // exports.newuser = function(req, res){
  // 	var Country_m 	= mongoose.model('country');
  // 	Country_m.find( function(err, countries){
  // 		res.render('user/signUp', {countries: countries} );
  // 	});
  // };
  //
  // exports.saveUser = function(req, res){
  // 	var User_m	= mongoose.model('user');
  // 	var form 	= req.body;
  //
  // 	User_m.findOne({email: form.email}, function( err, doc ){
  // 		if( !empty(doc) ){
  // 			res.send({'errors' : [form.email+' is already being used'] });
  // 		}else{
  // 			saveUser( form );
  // 			res.send({'success' : 'success' });
  // 		}
  // 	});
  //
  // };
  //
  // function saveUser( form ){
  // 	var User_m	= mongoose.model('user');
  //
  // 	var json = {
  // 		first_name	: form.first_name,
  // 		last_name	: form.last_name,
  // 		email		: form.email,
  // 		address 	: {
  // 			country : form.country,
  // 			city 	: form.city,
  // 			street 	: form.street,
  // 			zip_code: form.zip_code
  // 		},
  // 		organization 		: form.organization,
  // 		organization_role 	: form.organization_role,
  // 		username 			: form.username,
  // 		password 			: password_hash.generate(form.password),
  // 		purpose	 			: form.purpose
  // 	}
  //
  // 	var user 	= new User_m(json);
  // 	user.save();
  //
  // 	return user;
  // }
  //
  // exports.logout = function(req, res){
  // 	req.session.destroy();
  // 	res.send('success');
  // }
  //
  // function empty(obj) {
  // 	// null and undefined are "empty"
  // 	if (obj == null) return true;
  //
  // 	// Assume if it has a length property with a non-zero value
  // 	// that that property is correct.
  // 	if (obj.length && obj.length > 0) return false;
  // 	if (obj.length === 0) return true;
  //
  // 	// Otherwise, does it have any properties of its own?
  // 	// Note that this doesn't handle
  // 	// toString and toValue enumeration bugs in IE < 9
  // 	for (var key in obj) {
  // 	if (hasOwnProperty.call(obj, key)) return false;
  // 	}
  //
  // 	return true;
  // }
