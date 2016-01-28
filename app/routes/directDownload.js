'use strict';

var _directDownload = require('../controllers/direct-download');

var _directDownload2 = _interopRequireDefault(_directDownload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

var aboutCtrl = new _directDownload2.default();

router.get(['/', '/about'], aboutCtrl.loadPage);
