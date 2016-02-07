'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserCtrl = function () {
  function UserCtrl() {
    _classCallCheck(this, UserCtrl);

    this.password_hash = require('password-hash');
  }

  _createClass(UserCtrl, [{
    key: 'signIn',
    value: function signIn(req, res) {
      var mongoose = require('mongoose');
      var Country_m = mongoose.model('country');
      var session = req.session;

      Country_m.find().sort({ name: 1 }) // DESC order
      .exec(function (err, countries) {
        res.render('user/authenticationIndex', { countries: countries, session: session });
      });
    }
  }, {
    key: 'logIn',
    value: function logIn(req, res) {
      var _this = this;

      var form = req.body;
      var username = form.username;
      var password = form.password;
      var response = {};

      mongoose.model('user').findOne({ email: username }, function (err, doc) {
        if (utils.empty(doc)) {
          response = { 'errors': ['No user with the email ' + form.username] };
        } else if (_this.password_hash.verify(password, doc.password)) {
          req.session.logged_in = true;
          req.session.name = doc.first_name;
          req.session.user_id = doc._id;

          response = { 'success': 'success' };
        } else {
          response = { 'errors': ['Incorrect password'] };
        }
        res.send(req.session);
      });
    }
  }, {
    key: 'saveUser',
    value: function saveUser(req, res) {
      var _this2 = this;

      var User_m = mongoose.model('user');
      var form = req.body;

      User_m.findOne({ email: form.email }, function (err, doc) {
        if (!utils.empty(doc)) {
          res.send({ 'errors': [form.email + ' is already being used'] });
        } else {
          _this2.insertUser(form);
          res.send({ 'success': 'success' });
        }
      });
    }
  }, {
    key: 'insertUser',
    value: function insertUser(form) {
      var User_m = mongoose.model('user');
      var address = {};
      var json = {};

      if (!utilities.empty(form.first_name)) json.first_name = form.first_name;

      if (!utilities.empty(form.last_name)) json.last_name = form.last_name;

      if (!utilities.empty(form.zip_code)) json.zip_code = form.zip_code;

      if (!utilities.empty(form.email)) json.email = form.email;

      if (!utilities.empty(form.password)) json.password = password_hash.generate(form.password);

      if (!utilities.empty(form.organization)) json.organization = form.organization;

      if (!utilities.empty(form.organization_role)) json.organization_role = form.organization_role;

      if (!utilities.empty(form.purpose)) json.purpose = form.purpose;

      if (!utilities.empty(form.country)) address.country = form.country;

      if (!utilities.empty(form.city)) address.city = form.city;

      if (!utilities.empty(form.street)) address.street = form.street;

      if (!utilities.empty(form.zip_code)) address.zip_code = form.zip_code;

      if (!utilities.empty(address)) json.address = address;

      // If session's user id exists, make an update
      if (req.session.logged_in && !utilities.empty(req.session.user_id)) {
        User_m.update({ _id: req.session.user_id }, { $set: json }, function () {
          var user = new User_m(json);
          return user;
        });
      } else {
        var user = new User_m(json);
        user.save();
        // sign up activity registration
        activityLog.saveActivity(user._id, 1, 'User ' + user.first_name + ' has signed up.');
        return user;
      }
    }
  }, {
    key: 'logout',
    value: function logout(req, res) {
      req.session.destroy();
      res.json({ 'success': 'success' });
    }
  }, {
    key: 'profile',
    value: function profile(req, res) {
      var _this3 = this;

      if (!req.session.logged_in) {
        res.render('template/errorPage', { config: config.web, errors: ["Access denied"] });
      } else {
        var User_m = mongoose.model('user');

        User_m.findOne({ _id: req.session.user_id }).populate('address.country').exec(function (err, user) {
          _this3.getUserActivityLog(user._id, function (activities) {
            res.render('user/profile/index', { user: user, activities: activities });
          });
        });
      }
    }
  }, {
    key: 'getProfileInfo',
    value: function getProfileInfo(req, res) {
      var User_m = mongoose.model('user');
      User_m.findOne({ _id: req.session.user_id }).populate('address.country').exec(function (err, user) {
        res.render('user/profile/profileInfo', { user: user });
      });
    }
  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      var User_m = mongoose.model('user');
      User_m.findOne({ _id: req.session.user_id }).populate('address.country').exec(function (err, user) {
        res.json(user);
      });
    }
  }, {
    key: 'getUserActivityLog',
    value: function getUserActivityLog(user_id, callback) {
      var ActivityLog_m = mongoose.model('activity_log');

      ActivityLog_m.find({
        user: user_id
      }).populate('activity', 'description').sort({ tmstp: -1 }).exec(function (err, docs) {
        callback(docs);
      });
    }
  }, {
    key: 'sendPasswdRecoveryNotification',

    /**
     * @TODO content to ES2015
     */
    value: function sendPasswdRecoveryNotification(user_id, email, hash) {
      /*
      let html = `<h3>Password recovery</h3>
                    <p>
                      In order to recover your sustData acount's password you shall click
                      <a href="${config.web.site_url}:${config.web.port}/user/recoverPassword?user=${user_id}&hash=${hash}">here<a>
                    </p>;`
      */
      var html = '<h3>Password recovery</h3>' + '<p>' + 'In order to recover your sustData acount\'s password you shall click ' + '<a href="' + config.web.site_url + ':' + config.web.port + '/user/recoverPassword?user=' + user_id + '&hash=' + hash + '">' + 'here' + '<a>' + '.</p>';
      mailer.init(email, 'SustData: Password recovery', html);
      mailer.sendMail();
    }
  }]);

  return UserCtrl;
}();

exports.default = UserCtrl;
