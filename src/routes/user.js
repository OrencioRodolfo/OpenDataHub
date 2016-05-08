'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/user', router);
};

import UserCtrl from '../controllers/user';
let userCtrl = new UserCtrl();

// load login/sign up page
router.get(['/', '/signin'], function(req, res) {
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

// User profile
router.get('/profile', function(req, res){
  userCtrl.profile(req, res);
});

// User profile
router.get('/details', function(req, res){
  userCtrl.getUser(req, res);
});
// Edit user settings
router.post('/editSettings', function(req, res){
  userCtrl.editSettings(req, res);
});

// User profile details (settings)
router.get('/getProfileInfo', function(req, res){
  userCtrl.getProfileInfo(req, res);
});

// manage password recovery request
router.post('/recoverPassword', function(req, res){
  userCtrl.recoverPasswordRequest(req, res);
});

// load password recovery page
router.get('/recoverPassword', function(req, res){
  userCtrl.recoverPasswordPage(req, res);
});

// change password for recovery
router.post('/changePassword', function(req, res){
  userCtrl.changePassword(req, res);
});
