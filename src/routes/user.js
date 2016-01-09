'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/user', router);
};

import About from '../controllers/user';
let userCtrl = new UserCtrl();

// Sign in form
app.get('/signin', userCtrl.signIn);

// User profile
app.get('/profile', userCtrl.profile);

// User profile details (settings)
app.get('/getProfileInfo', userCtrl.getProfileInfo);

// Edit user settings
app.post('/editSettings', userCtrl.editSettings);

app.get('/downloadExample', userCtrl.downloadExample);

// submission and validation of login form
app.post('/login', userCtrl.login);

// submission and validation of login form
app.get('/logout', userCtrl.logout);

// list of all users
app.get('s', userCtrl.listUsers);

// insert record new user
app.post('/saveUser', userCtrl.saveUser);

// manage password recovery request
app.post('/recoverPassword', userCtrl.recoverPasswordRequest);

// load password recovery page
app.get('/recoverPassword', userCtrl.recoverPasswordPage);

// change password for recovery
app.post('/changePassword', userCtrl.changePassword);
