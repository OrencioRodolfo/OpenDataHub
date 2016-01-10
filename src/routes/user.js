'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/user', router);
};

import UserCtrl from '../controllers/user';
let userCtrl = new UserCtrl();

// load login/sign up page
router.get('/', function(req, res) {
  userCtrl.signIn(req, res);
});

// submission and validation of login form
router.post('/login', function(req, res) {
  userCtrl.logIn(req, res);
});

// submission and validation of login form
router.get('/logout', function(req, res) {
  userCtrl.logout(req, res);
});

// record new user
router.post('/saveUser', function(req, res){
  userCtrl.saveUser(req, res);
});

// // User profile
// router.get('/profile', userCtrl.profile);
//
// // User profile details (settings)
// router.get('/getProfileInfo', userCtrl.getProfileInfo);
//
// // Edit user settings
// router.post('/editSettings', userCtrl.editSettings);

// // manage password recovery request
// router.post('/recoverPassword', userCtrl.recoverPasswordRequest);
//
// // load password recovery page
// router.get('/recoverPassword', userCtrl.recoverPasswordPage);
//
// // change password for recovery
// router.post('/changePassword', userCtrl.changePassword);
