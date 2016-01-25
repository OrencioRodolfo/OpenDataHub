'use strict';

export default class ExplorerCtrl {
  constructor() {
    this.password_hash = require('password-hash');
    // this.moment     = require('moment');
    // this.exec          = require('child_process').exec;
  }

  loadPage (req, res) {
    let title   = 'Data Explorer';
    let session = req.session;

    res.render('dataConsult/index', {title, session});
  }

  queryData (req, res) {
    let data = this.queryDataset(req);
    res.render('dataConsult/formDataConsult', data);
  }

  queryDataset (req) {
  	let dataset = req.body.dataset;
  	let data 	= {};
  	switch (dataset) {
  		case "energy_consumption":
  			data.collection	= 'power_sample';
  			data.fields 	= [ {'field': 'iid' , 	'type': 'integer', 'description': 'Monitored home unique identifier'},
  								{'field': 'tmstp', 	'type': 'date', 	'description': 'Date and time of the measurement'},
  								{'field': 'deploy', 'type': 'float', 	'description': 'Deployment'},
  								{'field': 'Imin', 	'type': 'float', 	'description': 'Minimum current'},
  								{'field': 'Imax', 	'type': 'float', 	'description': 'Maximum current'},
  								{'field': 'Iavg', 	'type': 'float', 	'description': 'Average current'},
  								{'field': 'Vmin', 	'type': 'float', 	'description': 'Minimum voltage'},
  								{'field': 'Vmax', 	'type': 'float', 	'description': 'Maximum voltage'},
  								{'field': 'Vavg', 	'type': 'float', 	'description': 'Average voltage'},
  								{'field': 'Pmin', 	'type': 'float', 	'description': 'Minimum real power'},
  								{'field': 'Pmax', 	'type': 'float', 	'description': 'Maximum real power'},
  								{'field': 'Pavg', 	'type': 'float', 	'description': 'Average real power'},
  								{'field': 'miss_flag', 'type': 'boolean', 'description': 'Post Process'}
  							];
  		break;

  		case "power_event":
  			data.collection	= 'power_event';
  			data.fields 	= [ {'field': 'iid' , 	'type': 'integer', 	'description': 'Monitored home unique identifier'},
  								{'field': 'tmstp', 	'type': 'date', 	'description': 'Date and time of the measurement'},
  								{'field': 'deploy', 'type': 'float', 	'description': 'Deployment'},
  								{'field': 'delta_P','type': 'float', 	'description': 'Real power change'},
  								{'field': 'delta_Q','type': 'float', 	'description': 'Reactive power change'},
  								{'field': 'trace_P','type': 'float', 	'description': 'Real power trace of the event (50 Hz)'},
  								{'field': 'trace_Q','type': 'float', 	'description': 'Reactive power trace of the event (50 Hz)'}
  							];
  		break;

  		case "user_event":
  			data.collection	= 'user_event';
  			data.fields 	= [ {'field': 'iid' , 		'type': 'integer', 	'description': 'Monitored home unique identifier'},
  								{'field': 'tmstp', 		'type': 'date', 	'description': 'Date and time of the measurement'},
  								{'field': 'deploy', 	'type': 'float', 	'description': 'Deployment'},
  								{'field': 'type_id',	'type': 'float', 	'description': 'Identifier of the type of interactions'},
  								{'field': 'type_name',	'type': 'string', 	'description': 'Type of interaction'},
  								{'field': 'view_id',	'type': 'float', 	'description': 'Identifier of the visualized screen'},
  								{'field': 'view_name',	'type': 'string', 	'description': 'Name of visualized screen'}
  							];
  		break;

  		case "demographic":
  			data.fields = {};
  		break;

  		case "electric_production":
  			data.collection	= 'electric_production';
  			data.fields 	= [ {'field': 'id' , 		'type': 'integer', 	'description': 'ID'},
  								{'field': 'tmstp', 		'type': 'date', 	'description': 'Date and time of the measurement'},
  								{'field': 'total', 		'type': 'float', 	'description': 'Total'},
  								{'field': 'thermal',	'type': 'float', 	'description': 'Thermal'},
  								{'field': 'hydro',		'type': 'float', 	'description': 'Hydro'},
  								{'field': 'eolic',		'type': 'float', 	'description': 'Eolic'},
  								{'field': 'biomass',	'type': 'float', 	'description': 'Biomass'},
  								{'field': 'solar',		'type': 'float', 	'description': 'Solar'}
  							];
  		break;

  		case "environmental_data":
  			data.collection	= 'environmental';
  			data.fields 	= [ {'field': 'tmstp', 		'type': 'date', 	'description': 'Date and time of the measurement'},
  								{'field': 'station_id', 'type': 'integer', 	'description': 'Station ID'},
  								{'field': 'station',	'type': 'string', 	'description': 'Station'},
  								{'field': 'Temp',		'type': 'float', 	'description': 'Temperature'},
  								{'field': 'Hum',		'type': 'float', 	'description': 'Eolic'},
  								{'field': 'WS',			'type': 'float', 	'description': 'Wind Speed'},
  								{'field': 'WD',			'type': 'string', 	'description': 'Wind Direction'},
  								{'field': 'Pre',		'type': 'float', 	'description': 'Precipitation'},
  								{'field': 'Cond',		'type': 'string', 	'description': 'Conditions'}
  							];
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

  searchDatasetData (req, res) {
    let req_data   = req.body;
  	let collection = req_data.collection;
  	let records    = null;

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

  searchPowerSampleData (req_data, res){
  	let PowerSample_m = mongoose.model('power_sample');
  	let query         = this.buildQuery(PowerSample_m, req_data.fields, req_data.selected_fields, req_data.group_by, req_data.page, req_data.num_rows);

  	query.exec( (err, docs)  => {
  		this.response(req_data, docs, res);
  	});
  }

  searchPowerEventData (req_data, res) {
  	let PowerEvent_m = mongoose.model('power_event');
  	let query        = this.buildQuery( PowerEvent_m, req_data.fields, req_data.selected_fields, req_data.group_by, req_data.page, req_data.num_rows);

  	query.exec((err, docs) => {
  		this.response( req_data, docs, res );
  	});
  }

  searchUserEventData (req_data, res) {
  	let UserEvent_m = mongoose.model('user_event');
  	let query       = this.buildQuery( UserEvent_m, req_data.fields, req_data.selected_fields, req_data.group_by, req_data.page, req_data.num_rows);

  	query.exec((err, docs) => {
  		this.response (req_data, docs, res);
  	});
  }

  searchElectricProductionData (req_data, res) {
  	let ElectricProduction_m = mongoose.model('electric_production');
  	let query                = this.buildQuery(ElectricProduction_m, req_data.fields, req_data.selected_fields, req_data.group_by, req_data.page, req_data.num_rows);

  	query.exec(function (err, docs) {
  		let fields 	= [];
  		req_data.selected_fields.forEach(function(field){
  			fields.push(field.field);
  		});

  		if (req_data.context == 'download') {
  			let file_path = saveDatasetFile( docs, fields, req_data.collection, req_data.file_extension );
  			res.send({file: file_path})
  		}else if (req_data.context == 'chart') {
  			let response = {records: docs, fields: fields};
  			res.render('dataConsult/canvas', response);
  		}else{
  			let response = {records: docs, fields: fields};
  			if (!utils.empty(req_data.page))
  				response.more_results = true;
  			res.render('dataConsult/listRecordsElectricProduction', response)
  		}
  	});
  }

  searchEnvironmentalData (req_data, res) {
  	let Environmental_m = mongoose.model('environmental');
  	let query           = this.buildQuery( Environmental_m, req_data.fields, req_data.selected_fields, req_data.group_by, req_data.page, req_data.num_rows);

  	query.exec((err, docs) => {
  		this.response( req_data, docs, res );
  	});
  }

  response (req_data, docs, res) {
  	let fields 	= [];
  	req_data.selected_fields.forEach(function(field){
  		fields.push(field.field);
  	});
  	//console.log(docs);
  	if (req_data.context == 'download') {
  		let file_path = saveDatasetFile( docs, fields, req_data.collection, req_data.file_extension );
  		res.send({file: file_path})
  	}else if (req_data.context == 'chart') {
  		let response = {records: docs, fields: fields};
  		res.render('dataConsult/canvas', response);
  	}else{
  		let response = {records: docs, fields: fields};
  		if (!utils.empty(req_data.page))
  			response.more_results = true;
  		res.render('dataConsult/listRecords', response);
  	}
  }

  buildQuery (model, fields, selected_fields, group_by, page, num_rows) {
    let query = null;
  	if (!utils.empty(page))
      query = model.aggregate({$skip: page * config.rows_per_page});
  	else
  		query = model.aggregate();

  	let group = { '_id': { 'year': '$y', 'month': '$m', 'day': '$d', 'hour': '$h', 'minute': '$m'} };

    let limit = 0;
  	if (!utils.empty(num_rows))
  		limit = parseInt(num_rows);
  	else
  		limit = config.rows_per_page;

  	let projection 	= this.setProjection(group_by);

  	// Specify the fields for output
  	if( !utils.empty(selected_fields) ){
  		selected_fields.forEach(function(field){
  			projection[field.field] = 1;

  			if (field.field == 'tmstp')
  				group[field.field] = {$max: '$'+field.field};
  			else
  				group[field.field] = {$avg: '$'+field.field};
  		});
  	}

  	query
  		.project(projection);

  	fields.forEach(function( field ){
  		// run the defined filters for the field
  		let where = {};
  		field.filters.forEach(function(filter){
  			if( utils.empty(filter.value) )
  				return;

  			if( field.type == 'date' ){
  				let date_time 	= new Date( filter.value );
  				filter.value 	= dateFormat(date_time, "yyyy-mm-dd HH:mm");
  			}else if( field.type == 'integer' || field.type == 'boolean' ){
  				filter.value = parseInt(filter.value);
  			}else if( field.type == 'float' ){
  				filter.value = parseFloat(filter.value);
  			}

  			if( filter.name == 'exactly' )
  				where.exact = filter.value;
  			else if(filter.name == 'max')
  				where.max = filter.value;
  			else if(filter.name == 'min')
  				where.min = filter.value;
  		});

  		let match = {};
  		if( !utils.empty(where.min) && !utils.empty(where.max) ){
  			match[field.field] = {$gte: where.min, $lte: where.max};
  		}else if( !utils.empty(where.min) ){
  			match[field.field] = {$gte: where.min};
  		}else if( !utils.empty(where.max) ){
  			match[field.field] = {$lte: where.max};
  		}else if( !utils.empty(where.exact) ){
  			match[field.field] = where.exact;
  		}
  		if (!utils.empty(match))
  			query
  				.match(match);
  	});

  	/*
  	console.log('----------------- projection -----------------');
  	console.log(projection);
  	console.log('----------------- limit -----------------');
  	console.log(limit);
  	console.log('----------------- group -----------------');
  	console.log(group);
  	*/

  	query
  		.project(projection)
  		.limit(limit)
  		.group(group);

  	return query;
  }

  setProjection(group_by) {
  	let json = {};
  	switch (group_by) {
  		case "minute":
  			json = {
  				y: {'$year': '$tmstp'},
  				m: {'$month': '$tmstp'},
  				d: {'$dayOfMonth': '$tmstp'},
  				h: {'$hour': '$tmstp'},
  				m: {'$minute': '$tmstp'}
  			};
  			break;
  		case "hour":
  			json = {
  				y: {'$year': '$tmstp'},
  				m: {'$month': '$tmstp'},
  				d: {'$dayOfMonth': '$tmstp'},
  				h: {'$hour': '$tmstp'}
  			};
  			break;
  		case "day":
  			json = {
  				y: {'$year': '$tmstp'},
  				m: {'$month': '$tmstp'},
  				d: {'$dayOfMonth': '$tmstp'}
  			};
  			break;
  		case "month":
  			json = {
  				y: {'$year': '$tmstp'},
  				m: {'$month': '$tmstp'}
  			};
  			break;
  		case "year":
  			json = {
  				y: {'$year': '$tmstp'}
  			};
  			break;
  		default:
  			json = {
  				y: {'$year': '$tmstp'},
  				m: {'$month': '$tmstp'},
  				d: {'$dayOfMonth': '$tmstp'},
  				h: {'$hour': '$tmstp'},
  				m: {'$minute': '$tmstp'}
  			};
  			break;
  	}
  	return json;
  }

  addFilter(req, res) {
  	let req_data = req.body;
  	if( req_data.type == 'integer' ){
  		let PowerSample_m 	= mongoose.model('power_sample');
  		let homes = PowerSample_m
  					.find()
  					.distinct('iid')
  					.exec(function( err, home_ids ){
  						res.render('dataConsult/addFilter', {'field': req_data, 'homes': home_ids});
  					});
  	}else{
  		res.render('dataConsult/addFilter', {'field': req_data});
  	}
  }
}

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
