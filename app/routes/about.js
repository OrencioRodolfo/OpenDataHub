'use strict';

var _about = require('../controllers/about');

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

var aboutCtrl = new _about2.default();

router.get(['/', '/about'], function (req, res) {
  aboutCtrl.loadPage(req, res);
});
//
// mongodump --host aveiro.m-iti.org --port 37017 --db sinais --collection power_event --out /data/sinais_dump_10_01_2016
// mongodump --host aveiro.m-iti.org --port 37017 --db sinais --collection power_sample --out /data/sinais_dump_10_01_2016
//
//
//
// mongorestore --db sinais --collection power_event power_event.bson
// mongorestore --db sinais --collection power_sample power_sample.bson
// mongorestore --db sinais --collection electric_production electric_production.bson
