'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

import About from '../controllers/about';
let aboutCtrl = new AboutCtrl();

router.get(['/', '/about'], aboutCtrl.loadPage);
