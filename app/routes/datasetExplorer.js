'use strict';

var _datasetExplorer = require('../controllers/datasetExplorer');

var _datasetExplorer2 = _interopRequireDefault(_datasetExplorer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/datasetExplorer', router);
};

var explorerCtrl = new _datasetExplorer2.default();

router.get('/', function (req, res) {
  return explorerCtrl.loadPage(req, res);
});

router.post('/queryData', function (req, res) {
  return explorerCtrl.queryData(req, res);
});

router.post('/addFilter', function (req, res) {
  return explorerCtrl.addFilter(req, res);
});

router.post('/searchDatasetData', function (req, res) {
  return explorerCtrl.searchDatasetData(req, res);
});

router.get('/metadata/:collection', function (req, res) {
  return explorerCtrl.getMetadata(req, res);
});

// router.get('/downloadDatasetFile', (req, res) => explorerCtrl.downloadDatasetFile(req, res));
