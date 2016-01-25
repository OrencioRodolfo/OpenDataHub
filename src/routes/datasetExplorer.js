'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/datasetExplorer', router);
};

import ExplorerCtrl from '../controllers/dataset-explorer';
let explorerCtrl = new ExplorerCtrl();

router.get('/', function(req, res){
  explorerCtrl.loadPage(req, res);
});

router.post('/queryData', function(req, res){
  explorerCtrl.queryData(req, res);
});

router.post('/addFilter', function(req, res){
  explorerCtrl.addFilter(req, res);
});

router.post('/searchDatasetData', function(req, res){
  explorerCtrl.searchDatasetData(req, res);
});

// router.get('/downloadDatasetFile', function(req, res){
//   explorerCtrl.downloadDatasetFile(req, res);
// });
