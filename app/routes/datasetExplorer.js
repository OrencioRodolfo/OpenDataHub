'use strict';

var _datasetExplorer = require('../controllers/dataset-explorer');

var _datasetExplorer2 = _interopRequireDefault(_datasetExplorer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/datasetExplorer', router);
};

var explorerCtrl = new _datasetExplorer2.default();

router.get('/', function (req, res) {
  explorerCtrl.loadPage(req, res);
});

router.post('/queryData', function (req, res) {
  explorerCtrl.queryData(req, res);
});

router.post('/addFilter', function (req, res) {
  explorerCtrl.addFilter(req, res);
});

router.post('/searchDatasetData', function (req, res) {
  explorerCtrl.searchDatasetData(req, res);
});

// router.get('/downloadDatasetFile', function(req, res){
//   explorerCtrl.downloadDatasetFile(req, res);
// });
