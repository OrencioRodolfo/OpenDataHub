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
  			res.json({'errors' : [form.email+' is already being used'] });
  		} else {
  			this.insertUser(req, form);
  			res.json({'success' : 'success' });
  		}
  	});
  }

  insertUser (req, form) {
    let User_m  = mongoose.model('user');
  	let address = {};
  	let json    = {};

  	if (!utils.empty(form.first_name))
  		json.first_name = form.first_name;

  	if (!utils.empty(form.last_name))
  		json.last_name = form.last_name;

  	if (!utils.empty(form.zip_code))
  		json.zip_code = form.zip_code;

  	if (!utils.empty(form.email))
  		json.email = form.email;

  	if (!utils.empty(form.password))
  		json.password = this.password_hash.generate(form.password);

  	if (!utils.empty(form.organization))
  		json.organization = form.organization;

  	if (!utils.empty(form.organization_role))
  		json.organization_role = form.organization_role;

  	if (!utils.empty(form.purpose))
  		json.purpose = form.purpose;

  	if (!utils.empty(form.country))
  		address.country = form.country;

  	if (!utils.empty(form.city))
  		address.city = form.city;

  	if (!utils.empty(form.street))
  		address.street = form.street;

  	if (!utils.empty(form.zip_code))
  		address.zip_code = form.zip_code;

  	if (!utils.empty(address))
  		json.address = address;

  	// If session's user id exists, make an update
  	if (req.session.logged_in && !utils.empty(req.session.user_id)) {
  		User_m.update({ _id: req.session.user_id }, {$set: json}, function(){
  			var user = new User_m(json);
  			return user;
  		});
  	}else{
  		var user = new User_m(json);
  		user.save();
  		// sign up activity registration
  		this._saveActivity(user._id, 1, 'User '+user.first_name+' has signed up.');
  		return user;
  	}
  }

  logout (req, res) {
    req.session.destroy();
    res.json({'success': 'success'});
  }

  profile (req, res) {
    if (!req.session.logged_in) {
      res.render('template/errorPage', {config: config, errors: ["Access denied"]});
    } else {
      let User_m = mongoose.model('user');

      User_m
        .findOne({_id: req.session.user_id})
        .populate('address.country')
        .exec((err, user) => {
          this.getUserActivityLog(user._id, function(activities){
            res.render('user/profile/index', {config: config, user, activities} );
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
        console.log(' ------------- ', user);
        res.render('user/profile/profileInfo', { user } );
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

  _saveActivity(user_id, activity_id, obs ) {
  	var ActivityLog_m	= mongoose.model('activity_log');
  	var date_time 		= new Date();

  	this._getActivityById(activity_id, function(doc){
  		var json = {
  			user		: user_id,
  			activity	: doc._id,
  			obs			: obs,
  			tmstp		: dateFormat(date_time, "yyyy-mm-dd HH:mm:ss"),

  		}

  		var activity_log = new ActivityLog_m(json);
  		//console.log(activity_log);
  		activity_log.save();
  	});
  }

  _getActivityById(activity_id, callback) {
  	var Activity_m	= mongoose.model('activity');
  	Activity_m
  		.findOne({id: activity_id})
  		.exec(function(err, doc){
  			callback(doc);
  		});
  }

  editSettings(req, res) {
  	var User_m	= mongoose.model('user');
  	var form 	= req.body;

  	User_m.findOne({email: form.email}, (err, doc) => {
  		if( !utils.empty(doc) && doc._id != req.session.user_id){
  			res.json({'errors' : [form.email+' is already being used'] });
        return;
  		} else {
  			// get user
  			User_m.findById(req.session.user_id, (err, doc) => {
  				// validate password change
  				if (!utils.empty(form.password) && !password_hash.verify( form.old_password, doc.password)) {
  					res.json({'errors' : ['Incorrect password']});
  					return;
  				}
  				this.insertUser(req, form);
  				res.json({'success' : 'success' });
          return;
  			});
  		}
  	});
  }

  recoverPasswordRequest(req, res) {
  	var User_m		= mongoose.model('user');
  	var form 		= req.body;
  	var date_time 	= new Date();
  	date_time 		= dateFormat(date_time, "yyyymmddHHmmss");
  	var str 		= date_time+config.encryption_key;
  	var hash 		= password_hash.generate(str)
  	User_m.findOne({email: form.email}, (err, user) => {
  		if (!utils.empty(user)) {
  			User_m.update(
  				{ _id: user._id },
  				{ $set: {hash: hash} },
  				() => {
  					this.sendPasswdRecoveryNotification(user._id, form.email, hash);
  					res.json({success : 'success'});
  				});
  		}
  	});
  }

  recoverPasswordPage(req, res) {
  	var url_parts 	= url.parse(req.url,true);
  	req_data 		= url_parts.query;

  	res.render('user/passwordRecovery', {user: req_data.user, hash: req_data.hash, config: config.web} );
  }

  changePassword(req, res) {
  	var User_m	= mongoose.model('user');
  	var form 	= req.body;
  	User_m.findOne({_id: form.user, hash: form.hash}, function(err, user){
  		if (!utils.empty(user)) {
  			user.password 	= password_hash.generate(form.password);
  			user.hash 		= null;
  			user.save(function(){
  				res.json({success : 'success'});
  			});
  		}else{
  			res.json({errors : 'Your request recovery password is invalid or has expired'});
  		}

  	});
  }
}
