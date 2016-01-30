'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExplorerCtrl = function () {
  function ExplorerCtrl() {
    _classCallCheck(this, ExplorerCtrl);

    this.password_hash = require('password-hash');
    // this.moment     = require('moment');
    // this.exec          = require('child_process').exec;
  }

  _createClass(ExplorerCtrl, [{
    key: 'loadPage',
    value: function loadPage(req, res) {
      var title = 'Data Explorer';
      var session = req.session;

      res.render('explorer/index', { title: title, session: session });
    }
  }, {
    key: 'queryData',
    value: function queryData(req, res) {
      var data = this.queryDataset(req);
      res.render('explorer/formDataConsult', data);
    }
  }, {
    key: 'queryDataset',
    value: function queryDataset(req) {
      var dataset = req.body.dataset;
      var data = {};
      switch (dataset) {
        case "energy_consumption":
          data.collection = 'power_sample';
          data.fields = [{ 'field': 'iid', 'type': 'integer', 'description': 'Monitored home unique identifier' }, { 'field': 'tmstp', 'type': 'date', 'description': 'Date and time of the measurement' }, { 'field': 'deploy', 'type': 'float', 'description': 'Deployment' }, { 'field': 'Imin', 'type': 'float', 'description': 'Minimum current' }, { 'field': 'Imax', 'type': 'float', 'description': 'Maximum current' }, { 'field': 'Iavg', 'type': 'float', 'description': 'Average current' }, { 'field': 'Vmin', 'type': 'float', 'description': 'Minimum voltage' }, { 'field': 'Vmax', 'type': 'float', 'description': 'Maximum voltage' }, { 'field': 'Vavg', 'type': 'float', 'description': 'Average voltage' }, { 'field': 'Pmin', 'type': 'float', 'description': 'Minimum real power' }, { 'field': 'Pmax', 'type': 'float', 'description': 'Maximum real power' }, { 'field': 'Pavg', 'type': 'float', 'description': 'Average real power' }, { 'field': 'miss_flag', 'type': 'boolean', 'description': 'Post Process' }];
          break;

        case "power_event":
          data.collection = 'power_event';
          data.fields = [{ 'field': 'iid', 'type': 'integer', 'description': 'Monitored home unique identifier' }, { 'field': 'tmstp', 'type': 'date', 'description': 'Date and time of the measurement' }, { 'field': 'deploy', 'type': 'float', 'description': 'Deployment' }, { 'field': 'delta_P', 'type': 'float', 'description': 'Real power change' }, { 'field': 'delta_Q', 'type': 'float', 'description': 'Reactive power change' }, { 'field': 'trace_P', 'type': 'float', 'description': 'Real power trace of the event (50 Hz)' }, { 'field': 'trace_Q', 'type': 'float', 'description': 'Reactive power trace of the event (50 Hz)' }];
          break;

        case "user_event":
          data.collection = 'user_event';
          data.fields = [{ 'field': 'iid', 'type': 'integer', 'description': 'Monitored home unique identifier' }, { 'field': 'tmstp', 'type': 'date', 'description': 'Date and time of the measurement' }, { 'field': 'deploy', 'type': 'float', 'description': 'Deployment' }, { 'field': 'type_id', 'type': 'float', 'description': 'Identifier of the type of interactions' }, { 'field': 'type_name', 'type': 'string', 'description': 'Type of interaction' }, { 'field': 'view_id', 'type': 'float', 'description': 'Identifier of the visualized screen' }, { 'field': 'view_name', 'type': 'string', 'description': 'Name of visualized screen' }];
          break;

        case "demographic":
          data.fields = {};
          break;

        case "electric_production":
          data.collection = 'electric_production';
          data.fields = [{ 'field': 'id', 'type': 'integer', 'description': 'ID' }, { 'field': 'tmstp', 'type': 'date', 'description': 'Date and time of the measurement' }, { 'field': 'total', 'type': 'float', 'description': 'Total' }, { 'field': 'thermal', 'type': 'float', 'description': 'Thermal' }, { 'field': 'hydro', 'type': 'float', 'description': 'Hydro' }, { 'field': 'eolic', 'type': 'float', 'description': 'Eolic' }, { 'field': 'biomass', 'type': 'float', 'description': 'Biomass' }, { 'field': 'solar', 'type': 'float', 'description': 'Solar' }];
          break;

        case "environmental_data":
          data.collection = 'environmental';
          data.fields = [{ 'field': 'tmstp', 'type': 'date', 'description': 'Date and time of the measurement' }, { 'field': 'station_id', 'type': 'integer', 'description': 'Station ID' }, { 'field': 'station', 'type': 'string', 'description': 'Station' }, { 'field': 'Temp', 'type': 'float', 'description': 'Temperature' }, { 'field': 'Hum', 'type': 'float', 'description': 'Eolic' }, { 'field': 'WS', 'type': 'float', 'description': 'Wind Speed' }, { 'field': 'WD', 'type': 'string', 'description': 'Wind Direction' }, { 'field': 'Pre', 'type': 'float', 'description': 'Precipitation' }, { 'field': 'Cond', 'type': 'string', 'description': 'Conditions' }];
          break;

        case "power_event_sum":
          data.fields = {};
          break;

        case "eco_feedback":
          data.fields = {};
          break;

        default:
          data.fields = {};
          break;
      }

      return data;
    }
  }, {
    key: 'searchDatasetData',
    value: function searchDatasetData(req, res) {
      var req_data = req.body;
      var collection = req_data.collection;
      var records = null;

      switch (collection) {
        case "power_sample":
          this.searchPowerSampleData(req_data, res);
          break;

        case "power_event":
          this.searchPowerEventData(req_data, res);
          break;

        case "user_event":
          this.searchUserEventData(req_data, res);
          break;

        case "electric_production":
          this.searchElectricProductionData(req_data, res);
          break;

        case "environmental":
          this.searchEnvironmentalData(req_data, res);
          break;

        default:
          res.send("Invalid request");
          return false;
          break;
      }
    }
  }, {
    key: 'searchPowerSampleData',
    value: function searchPowerSampleData(req_data, res) {
      var cursor = this.buildQuery('power_sample');
      cursor.toArray(function (err, docs) {
        var response = {
          'headers': [{ 'field': 'iid', 'label': 'Home ID' }, { 'field': 'tmstp', 'label': 'Date ' }, { 'field': 'deploy', 'label': 'Deployment' }, { 'field': 'Imin', 'label': 'Min. current' }, { 'field': 'Imax', 'label': 'Max. current' }, { 'field': 'Iavg', 'label': 'Avg current' }, { 'field': 'Vmin', 'label': 'Min. voltage' }, { 'field': 'Vmax', 'label': 'Max. voltage' }, { 'field': 'Vavg', 'label': 'Avg voltage' }, { 'field': 'Pmin', 'label': 'Min. real power' }, { 'field': 'Pmax', 'label': 'Max. real power' }, { 'field': 'Pavg', 'label': 'Avg real power' }, { 'field': 'miss_flag', 'label': 'Post Process' }],
          'rows': docs
        };
        res.json(response);
      });
    }
  }, {
    key: 'searchPowerEventData',
    value: function searchPowerEventData(req_data, res) {
      var cursor = this.buildQuery('power_event');
      cursor.toArray(function (err, docs) {
        var response = {
          'headers': [{ 'field': 'iid', 'label': 'Home ID' }, { 'field': 'tmstp', 'label': 'Date' }, { 'field': 'deploy', 'label': 'Deployment' }, { 'field': 'delta_P', 'label': 'Real power change' }, { 'field': 'delta_Q', 'label': 'Reactive power change' }, { 'field': 'trace_P', 'label': 'Real power trace' }, { 'field': 'trace_Q', 'label': 'Reactive power trace' }],
          'rows': docs
        };
        res.json(response);
      });
    }
  }, {
    key: 'searchUserEventData',
    value: function searchUserEventData(req_data, res) {
      var cursor = this.buildQuery('user_event');
      cursor.toArray(function (err, docs) {
        var response = {
          'headers': [{ 'field': 'tmstp', 'label': 'Home ID' }, { 'field': 'deploy', 'label': 'Date' }, { 'field': 'type_id', 'label': 'Deployment' }, { 'field': 'type_name', 'label': 'Interaction' }, { 'field': 'view_id', 'label': 'Screen ID' }, { 'field': 'view_name', 'label': 'Screen name' }],
          'rows': docs
        };
        res.json(response);
        // db.close();
      });
    }
  }, {
    key: 'searchElectricProductionData',
    value: function searchElectricProductionData(req_data, res) {
      var cursor = this.buildQuery('electric_production');

      cursor.toArray(function (err, docs) {
        var response = {
          'headers': [{ 'field': 'id', 'label': 'ID' }, { 'field': 'tmstp', 'label': 'Date' }, { 'field': 'total', 'label': 'Total' }, { 'field': 'thermal', 'label': 'Thermal' }, { 'field': 'hydro', 'label': 'Hydro' }, { 'field': 'eolic', 'label': 'Eolic' }, { 'field': 'biomass', 'label': 'Biomass' }, { 'field': 'solar', 'label': 'Solar' }],
          'rows': docs
        };
        res.json(response);
        // db.close();
      });
    }
  }, {
    key: 'searchEnvironmentalData',
    value: function searchEnvironmentalData(req_data, res) {
      var cursor = this.buildQuery('environmental');
      cursor.toArray(function (err, docs) {
        var response = {
          'headers': [{ 'field': 'tmstp', 'label': 'Date' }, { 'field': 'station_id', 'label': 'Station ID' }, { 'field': 'station', 'label': 'Station' }, { 'field': 'Temp', 'label': 'Temperature' }, { 'field': 'Hum', 'label': 'Eolic' }, { 'field': 'WS', 'label': 'Wind Speed' }, { 'field': 'WD', 'label': 'Wind Direction' }, { 'field': 'Pre', 'label': 'Precipitation' }, { 'field': 'Cond', 'label': 'Conditions' }],
          'rows': docs
        };
        res.json(response);
      });
    }
  }, {
    key: 'response',
    value: function response(req_data, docs, res) {
      var fields = [];
      req_data.selected_fields.forEach(function (field) {
        fields.push(field.field);
      });
      //console.log(docs);
      if (req_data.context == 'download') {
        var file_path = saveDatasetFile(docs, fields, req_data.collection, req_data.file_extension);
        res.send({ file: file_path });
      } else if (req_data.context == 'chart') {
        var _response = { records: docs, fields: fields };
        res.render('dataConsult/canvas', _response);
      } else {
        var _response2 = { records: docs, fields: fields };
        if (!utils.empty(req_data.page)) _response2.more_results = true;
        res.render('dataConsult/listRecords', _response2);
      }
    }
  }, {
    key: 'buildQuery',
    value: function buildQuery(collection) {
      var cursor = db.collection(collection).find();
      return cursor.limit(10);
    }
  }, {
    key: 'setProjection',
    value: function setProjection(group_by) {
      var json = {};
      switch (group_by) {
        case "minute":
          json = {
            y: { '$year': '$tmstp' },
            m: { '$month': '$tmstp' },
            d: { '$dayOfMonth': '$tmstp' },
            h: { '$hour': '$tmstp' },
            m: { '$minute': '$tmstp' }
          };
          break;
        case "hour":
          json = {
            y: { '$year': '$tmstp' },
            m: { '$month': '$tmstp' },
            d: { '$dayOfMonth': '$tmstp' },
            h: { '$hour': '$tmstp' }
          };
          break;
        case "day":
          json = {
            y: { '$year': '$tmstp' },
            m: { '$month': '$tmstp' },
            d: { '$dayOfMonth': '$tmstp' }
          };
          break;
        case "month":
          json = {
            y: { '$year': '$tmstp' },
            m: { '$month': '$tmstp' }
          };
          break;
        case "year":
          json = {
            y: { '$year': '$tmstp' }
          };
          break;
        default:
          json = {
            y: { '$year': '$tmstp' },
            m: { '$month': '$tmstp' },
            d: { '$dayOfMonth': '$tmstp' },
            h: { '$hour': '$tmstp' },
            m: { '$minute': '$tmstp' }
          };
          break;
      }
      return json;
    }
  }, {
    key: 'addFilter',
    value: function addFilter(req, res) {
      var req_data = req.body;
      if (req_data.type == 'integer') {
        var PowerSample_m = mongoose.model('power_sample');
        var homes = PowerSample_m.find().distinct('iid').exec(function (err, home_ids) {
          res.render('dataConsult/addFilter', { 'field': req_data, 'homes': home_ids });
        });
      } else {
        res.render('dataConsult/addFilter', { 'field': req_data });
      }
    }
  }]);

  return ExplorerCtrl;
}();

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
