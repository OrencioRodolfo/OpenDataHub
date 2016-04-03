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

  constructor() {
  }

  /**
   * @description
   * Responsible for quering the database retriving all the data from the
   * collection, being aware of the filters specified by the user
   *
   * @public
   *
   * @param  {String}   collection the name of the collection to be queried
   * @param  {Object}   fields     an array identifying which fields are selected to be
   * present on the data preview
   * @param  {Object}   filters    an array containing all the filters specified by the user
   * @param  {Function} callback   the callback to be executed when the query
   * is performed. Containing the query result.
   */
  getCollectionData(collection, fields, filters, callback) {
    const queryFilters = this._setFilters(filters);
    const projection = this._setProjection(fields);

    // @TODO remove me
    // console.log('queryFilters', queryFilters);
    // console.log('fields', fields);
    console.log('projection', projection);

    // build the query and return the promise with its result
    db.collection(collection)
      .find(queryFilters, projection)
      .limit(50)
      .toArray(callback);
  }

  /**
   * @description
   * Responsible for setting up the query 'projection' object
   * in order to present only the fields marked as visible
   *
   * @param {Array} fields an array with the names of the selected fields for visualization
   */
  _setProjection(fields) {
    if (!fields || !fields.length)
      return {};

    let projection = {
      _id: -1
    };
    for (var i = 0; i < fields.length; i++) {
      let field = fields[i];
      projection[field] = 1;
    }

    return projection;
  }

  /**
   * @description
   * Responsible for building the query statements for filtering the data
   *
   * @private
   *
   * @param  {Object} filters  an array containing all the filters specified by the user
   * @return {JSON} the query statement
   */
  _setFilters(filters) {
    let result = {};

    if (!filters.length)
      return result;

    filters.forEach((filter) => {
      // if it has no values, then ignore it
      if (!filter.val && !filter.min && !filter.max) return;

    	let json = {};
      switch (filter.type) {
        case 'number':
          json = this._setNumberFilter(filter);
          break;
        case 'date':
          json = this._setDateFilter(filter);
          break;

        // by default treat it like a string
        default:
          json = this._setStringFilter(filter);
      }

      result[filter.field] = json;
    });

    return result;
  }

  /**
   * @description
   * Responsible for building the query statements for filters that are numbers
   * Builds a statement like: 'higher than number X and/or lower than number Y'
   *
   * @private
   *
   * @param {JSON} filter one of the specified filters
   * @return {JSON} the query statement
   */
  _setNumberFilter(filter) {
    let json = {};

    if (filter.min)
      json['$gte'] = filter.min;
    if (filter.max)
      json['$lte'] = filter.max;

    return json;
  }

  /**
   * @description
   * Responsible for building the query statements for filters that are dates
   * Builds a statement like: 'higher than date X and/or lower than date Y'
   *
   * @private
   *
   * @param {JSON} filter one of the specified filters
   * @return {JSON} the query statement
   */
  _setDateFilter(filter) {
    let json = {};

    if (filter.min) {
      let minDate  = new Date(filter.min);
      json['$gte'] = minDate;
    }

    if (filter.max) {
      let maxDate  = new Date(filter.max);
      json['$lte'] = maxDate;
    }

    return json;
  }

  /**
   * @description
   * Responsible for building the query statements for filters that are dates
   * Builds a statement like: 'contains something like X'
   *
   * @private
   *
   * @param {JSON} filter one of the specified filters
   * @return {String} a regex that defines a 'like' query statement
   */
  _setStringFilter(filter) {
    return new RegExp(filter.val, 'i');
  }

  /**
   * Responsible for quering the database and retrieve the metadata for
   * a certain collection
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

  // setProjection(group_by) {
  // 	let json = {};
  // 	switch (group_by) {
  // 		case "minute":
  // 			json = {
  // 				y: {'$year': '$tmstp'},
  // 				m: {'$month': '$tmstp'},
  // 				d: {'$dayOfMonth': '$tmstp'},
  // 				h: {'$hour': '$tmstp'},
  // 				m: {'$minute': '$tmstp'}
  // 			};
  // 			break;
  // 		case "hour":
  // 			json = {
  // 				y: {'$year': '$tmstp'},
  // 				m: {'$month': '$tmstp'},
  // 				d: {'$dayOfMonth': '$tmstp'},
  // 				h: {'$hour': '$tmstp'}
  // 			};
  // 			break;
  // 		case "day":
  // 			json = {
  // 				y: {'$year': '$tmstp'},
  // 				m: {'$month': '$tmstp'},
  // 				d: {'$dayOfMonth': '$tmstp'}
  // 			};
  // 			break;
  // 		case "month":
  // 			json = {
  // 				y: {'$year': '$tmstp'},
  // 				m: {'$month': '$tmstp'}
  // 			};
  // 			break;
  // 		case "year":
  // 			json = {
  // 				y: {'$year': '$tmstp'}
  // 			};
  // 			break;
  // 		default:
  // 			json = {
  // 				y: {'$year': '$tmstp'},
  // 				m: {'$month': '$tmstp'},
  // 				d: {'$dayOfMonth': '$tmstp'},
  // 				h: {'$hour': '$tmstp'},
  // 				m: {'$minute': '$tmstp'}
  // 			};
  // 			break;
  // 	}
  // 	return json;
  // }
}
