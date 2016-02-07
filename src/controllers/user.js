export default class UserCtrl {

  constructor() {
    this.password_hash = require('password-hash');
  }

  signIn (req, res) {
    let mongoose  = require('mongoose');
    let Country_m = mongoose.model('country');
    let session   = req.session;

    Country_m
  		.find()
  		.sort({name: 1}) // DESC order
  		.exec(function(err, countries){
  			res.render('user/authenticationIndex', {countries, session} );
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
        req.session.user_id 	= doc._id;

        response              = {'success': 'success'};
      } else {
  			response = {'errors' : ['Incorrect password']}
  		}
      res.send(req.session);
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
    let User_m  = mongoose.model('user');
  	let address = {};
  	let json    = {};

  	if (!utilities.empty(form.first_name))
  		json.first_name = form.first_name;

  	if (!utilities.empty(form.last_name))
  		json.last_name = form.last_name;

  	if (!utilities.empty(form.zip_code))
  		json.zip_code = form.zip_code;

  	if (!utilities.empty(form.email))
  		json.email = form.email;

  	if (!utilities.empty(form.password))
  		json.password = password_hash.generate(form.password);

  	if (!utilities.empty(form.organization))
  		json.organization = form.organization;

  	if (!utilities.empty(form.organization_role))
  		json.organization_role = form.organization_role;

  	if (!utilities.empty(form.purpose))
  		json.purpose = form.purpose;

  	if (!utilities.empty(form.country))
  		address.country = form.country;

  	if (!utilities.empty(form.city))
  		address.city = form.city;

  	if (!utilities.empty(form.street))
  		address.street = form.street;

  	if (!utilities.empty(form.zip_code))
  		address.zip_code = form.zip_code;

  	if (!utilities.empty(address))
  		json.address = address;

  	// If session's user id exists, make an update
  	if (req.session.logged_in && !utilities.empty(req.session.user_id)) {
  		User_m.update({ _id: req.session.user_id }, {$set: json}, function(){
  			var user = new User_m(json);
  			return user;
  		});
  	}else{
  		var user = new User_m(json);
  		user.save();
  		// sign up activity registration
  		activityLog.saveActivity(user._id, 1, 'User '+user.first_name+' has signed up.');
  		return user;
  	}
  }

  logout (req, res) {
    req.session.destroy();
    res.json({'success': 'success'});
  }

  profile (req, res) {
    if (!req.session.logged_in) {
      res.render('template/errorPage', {config: config.web, errors: ["Access denied"]});
    } else {
      let User_m = mongoose.model('user');

      User_m
        .findOne({_id: req.session.user_id})
        .populate('address.country')
        .exec((err, user) => {
          this.getUserActivityLog(user._id, function(activities){
            res.render('user/profile/index', {user, activities} );
          });
        });
    }
  };

  getProfileInfo (req, res) {
    let User_m = mongoose.model('user');
    User_m
      .findOne({_id: req.session.user_id})
      .populate('address.country')
      .exec(function(err, user){
        res.render('user/profile/profileInfo', {user: user} );
      });
  }

  getUser (req, res) {
    let User_m = mongoose.model('user');
    User_m
      .findOne({_id: req.session.user_id})
      .populate('address.country')
      .exec(function(err, user){
        res.json(user);
      });
  }

  getUserActivityLog (user_id, callback) {
    let ActivityLog_m	= mongoose.model('activity_log');

    ActivityLog_m
      .find({
        user: user_id
      })
      .populate('activity', 'description')
      .sort({tmstp: -1})
      .exec(function (err, docs) {
        callback(docs);
      });
  };

  /**
   * @TODO content to ES2015
   */
  sendPasswdRecoveryNotification (user_id, email, hash) {
    /*
    let html = `<h3>Password recovery</h3>
                  <p>
                    In order to recover your sustData acount's password you shall click
                    <a href="${config.web.site_url}:${config.web.port}/user/recoverPassword?user=${user_id}&hash=${hash}">here<a>
                  </p>;`
    */
    var html = 		'<h3>Password recovery</h3>'
                +	'<p>'
                +		'In order to recover your sustData acount\'s password you shall click '
                + 		'<a href="'+config.web.site_url+':'+config.web.port+'/user/recoverPassword?user='+user_id+'&hash='+hash+'">'
                +			'here'
                +		'<a>'
                +	'.</p>';
    mailer.init(email, 'SustData: Password recovery', html);
    mailer.sendMail();
  }
}
