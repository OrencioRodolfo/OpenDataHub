'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/directDownload', router);
};

import DirectDownloadCtrl from '../controllers/direct-download';
let directDownloadCtrl = new DirectDownloadCtrl();

router.get(['/'], function (req, res) {
  directDownloadCtrl.loadPage(req, res);
});
