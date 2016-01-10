'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/contacts', router);
};

import ContactsCtrl from '../controllers/contacts';
let contactsCtrl = new ContactsCtrl();

router.get('/', contactsCtrl.loadPage);
