'use strict';

let express  = require('express'),
    router   = express.Router();

module.exports = function (app) {
  app.use('/datasetExplorer', router);
};

import ExplorerCtrl from '../controllers/datasetExplorer';
let explorerCtrl = new ExplorerCtrl();

router.get('/', (req, res) => explorerCtrl.loadPage(req, res));

router.post('/queryData', (req, res) => explorerCtrl.queryData(req, res));

router.post('/addFilter', (req, res) => explorerCtrl.addFilter(req, res));

router.get('/searchDatasetData', (req, res) => explorerCtrl.searchDatasetData(req, res));

router.get('/metadata/:collection', (req, res) => explorerCtrl.getMetadata(req, res));

router.get('/downloadDatasetFile', (req, res) => explorerCtrl.downloadDatasetFile(req, res));
