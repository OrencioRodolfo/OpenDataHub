'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/user', router);
};

import UserCtrl from '../controllers/user';
let userCtrl = new UserCtrl();

router.get('/', userCtrl.signIn);

// submission and validation of login form
router.post('/login', userCtrl.logIn);

// // User profile
// router.get('/profile', userCtrl.profile);
//
// // User profile details (settings)
// router.get('/getProfileInfo', userCtrl.getProfileInfo);
//
// // Edit user settings
// router.post('/editSettings', userCtrl.editSettings);
//
// router.get('/downloadExample', userCtrl.downloadExample);
//
//
// // submission and validation of login form
// router.get('/logout', userCtrl.logout);
//
// // list of all users
// router.get('s', userCtrl.listUsers);
//
// // insert record new user
// router.post('/saveUser', userCtrl.saveUser);
//
// // manage password recovery request
// router.post('/recoverPassword', userCtrl.recoverPasswordRequest);
//
// // load password recovery page
// router.get('/recoverPassword', userCtrl.recoverPasswordPage);
//
// // change password for recovery
// router.post('/changePassword', userCtrl.changePassword);
