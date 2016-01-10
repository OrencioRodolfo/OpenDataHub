export default class UserCtrl {

  constructor() {
    this.password_hash = require('password-hash');
  }

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
    let form     = req.body;
  	let username = form.username;
  	let password = form.password;
    let response = {};

  	mongoose.model('user').findOne({email: username}, (err, doc) => {
  		if (utils.empty(doc)) {
  			response = {'errors' : ['No user with the email '+form.username]};
  		} else if (this.password_hash.verify(password, doc.password)) {
        req.session.logged_in = true;
        req.session.name      = doc.first_name;
        response              = {'success': 'success'};
      } else {
  			response = {'errors' : ['Incorrect password']}
  		}
  		res.send(response);
  	});
  }

  saveUser (req, res) {
  	let User_m = mongoose.model('user');
  	let form   = req.body;

  	User_m.findOne({email: form.email}, (err, doc) => {
  		if (!utils.empty(doc)) {
  			res.send({'errors' : [form.email+' is already being used'] });
  		} else {
  			this.insertUser(form);
  			res.send({'success' : 'success' });
  		}
  	});
  }

  insertUser (form) {
  	let User_m	= mongoose.model('user');
  	let json = {
  		'first_name': form.first_name,
  		'last_name': form.last_name,
  		'email': form.email,
  		'address': {
  			'country': form.country,
  			'city': form.city,
  			'street': form.street,
  			'zip_code': form.zip_code
  		},
  		'organization': form.organization,
  		'organization_role': form.organization_role,
  		'username': form.username,
  		'password': this.password_hash.generate(form.password),
  		'purpose': form.purpose
  	}

  	let user 	= new User_m(json);
  	user.save();

  	return user;
  }

  logout (req, res) {
    req.session.destroy();
    res.send('success');
  }
}
