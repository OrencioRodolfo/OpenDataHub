'use strict';

var _contacts = require('../controllers/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/contacts', router);
};

var contactsInst = new _contacts2.default();

router.get('/', contactsInst.loadPage);
