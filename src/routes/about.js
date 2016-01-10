'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

import AboutCtrl from '../controllers/about';
let aboutCtrl = new AboutCtrl();

router.get(['/', '/about'], aboutCtrl.loadPage);
// 
// mongodump --host aveiro.m-iti.org --port 37017 --db sinais --collection power_event --out /data/sinais_dump_10_01_2016
// mongodump --host aveiro.m-iti.org --port 37017 --db sinais --collection power_sample --out /data/sinais_dump_10_01_2016
//
//
//
// mongorestore --db sinais --collection power_event power_event.bson
// mongorestore --db sinais --collection power_sample power_sample.bson
// mongorestore --db sinais --collection electric_production electric_production.bson
