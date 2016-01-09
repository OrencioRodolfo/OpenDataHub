'use strict';

var _about = require('../controllers/about');

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

var aboutInst = new _about2.default();

router.get(['/', '/about'], aboutInst.loadPage);
