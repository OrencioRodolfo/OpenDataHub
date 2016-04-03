'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryBuilder = require('../libs/queryBuilder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var queryBuilder = new _queryBuilder2.default();

/**
 * @class ExplorerCtrl
 * @description
 * Responsible for all the logic processing relative to the data explorer module
 *
 * @author ogoncalves
 * @date 2016-02-17
 */

var ExplorerCtrl = function () {
  function ExplorerCtrl() {
    _classCallCheck(this, ExplorerCtrl);
  }

  /**
   * @description Responsible for loading the index page of the Data Explorer module
   * @public
   * @param  {object} req NodeJS request obj
   * @param  {object} res NodeJS request obj
   * @return {html} the rendered index page
   */

  _createClass(ExplorerCtrl, [{
    key: 'loadPage',
    value: function loadPage(req, res) {
      var title = 'Data Explorer';
      var session = req.session;
      res.render('explorer/index', { title: title, session: session });
    }

    /**
     * @description Responsible for loading the metadata from MongoFB for a certain collection
     * @public
     * @param  {object} req NodeJS request obj
     * @param  {object} res NodeJS request obj
     * @return {json} the collection metadata, identifying its fields, descriptions and so on
     */

  }, {
    key: 'getMetadata',
    value: function getMetadata(req, res) {
      var params = req.params;
      queryBuilder.getCollectionMetadata(params.collection, function (doc) {
        res.json(doc);
      });
    }
  }, {
    key: 'searchDatasetData',

    /**
     * @description Responsible for receiving a request with filters to query a specific
     * collection and return its data
     * @public
     * @param  {object} req NodeJS request obj
     * @return {json} the collection metadata, identifying its fields, descriptions and so on
     */
    value: function searchDatasetData(req, res) {
      var req_data = req.body;
      var collection = req_data.collection;
      var fields = req_data.fields;
      var filters = req_data.filters;
      var response = {};

      queryBuilder.getCollectionData(collection, fields, filters, function (err, docs) {
        response.rows = docs;
        res.json(response);
      });
    }
  }]);

  return ExplorerCtrl;
}();

// response(req_data, docs, res) {
//   let fields 	= [];
//   req_data.selected_fields.forEach(function(field){
//     fields.push(field.field);
//   });
//   //console.log(docs);
//   if (req_data.context == 'download') {
//     let file_path = saveDatasetFile( docs, fields, req_data.collection, req_data.file_extension );
//     res.send({file: file_path})
//   }else if (req_data.context == 'chart') {
//     let response = {records: docs, fields: fields};
//     res.render('dataConsult/canvas', response);
//   }else{
//     let response = {records: docs, fields: fields};
//     if (!utils.empty(req_data.page))
//     response.more_results = true;
//     res.render('dataConsult/listRecords', response);
//   }
// }

//
// exports.downloadDatasetFile = function (req, res) {
// 	let req_data = req.query;
// 	res.download(config.fs.storage_folder+req_data.file);
// }

// function saveDatasetFile( data, fields, collection, extension ){
// 	let directory 	= generateStoragePath();
// 	let time 		= dateFormat("HHmmss");
// 	let file_name	= '/'+collection+'_'+time+'.'+extension;
//
// 	fs.mkdir(directory.full_path, 0777, true, function (err) {
// 		if (err)
// 			console.log(err);
// 		else{
// 			if( extension == 'js' ){
// 				fs.writeFile(directory.full_path+file_name, data, function(err) {
// 					if (err)
// 						throw err;
// 				});
// 			}else{
// 				json2csv({data: data, fields: fields, del: ';'}, function(err, csv) {
// 					fs.writeFile(directory.full_path+file_name, csv, function(err) {
// 						if (err)
// 							throw err;
// 					});
// 				});
// 			}
// 		}
// 	});
//
// 	return directory.relative_path+file_name;
// }
//
// function generateStoragePath(){
// 	let year 			= dateFormat("yyyy");
// 	let month			= dateFormat("mm");
// 	let day 			= dateFormat("dd");
// 	let relative_path 	= year+'/'+month+'/'+day;
// 	return {relative_path: relative_path, full_path: config.fs.storage_folder+relative_path};
// }

exports.default = ExplorerCtrl;
