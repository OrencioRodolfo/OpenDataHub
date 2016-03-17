/**
 * @class QueryBuilder
 * @description
 * Responsible for building MongoDB queries according to the filters
 * specified on data explorer
 *
 * @author ogoncalves
 * @date 2016-02-17
 */
export default class QueryBuilder {
  /**
   * [constructor description]
   * @param  {[type]} fields=[]  [description]
   * @param  {[type]} filters=[] [description]
   * @return {[type]}            [description]
   */
  constructor() {
  }

  getCollectionData(collection, fields, filters, callback) {
    const queryFilters = this._setFilters(filters);

    // build the query and return the promise with its result
    db.collection(collection)
      .find(queryFilters)
      .limit(50)
      .toArray(callback);
  }

  _setFilters(filters) {
    let result = {};

    if (!filters.length)
      return result;

    filters.forEach(function(filter){
    	let json = {};

      if (filter.min)
      	json['$gte'] = filter.min;
      if (filter.max)
      	json['$lte'] = filter.max;

      result[filter.field] = json;
    });

    return result;
  }

  /**
   * Responsible for quering the database and retrieve the metadata for a certain collection
   * @private
   * @param  {String}   collection - the name of the collection to query
   * @param  {Function} callback - The callback that will handle the database response
   * @return {function} the result of the query
   */
  getCollectionMetadata(collection, callback) {
    const Metadata_m = mongoose.model('metadata');
    return Metadata_m
            .findOne({collectionName: collection})
            .exec((err, doc) => callback(doc));
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
