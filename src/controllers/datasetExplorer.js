import QueryBuilder from '../libs/queryBuilder';
const queryBuilder = new QueryBuilder();

/**
 * @class ExplorerCtrl
 * @description
 * Responsible for all the logic processing relative to the data explorer module
 *
 * @author ogoncalves
 * @date 2016-02-17
 */
export default class ExplorerCtrl {
  constructor() {
  }

  /**
   * @description Responsible for loading the index page of the Data Explorer module
   * @public
   * @param  {object} req NodeJS request obj
   * @param  {object} res NodeJS request obj
   * @return {html} the rendered index page
   */
  loadPage (req, res) {
    let title   = 'Data Explorer';
    let session = req.session;
    res.render('explorer/index', {title, session});
  }

  /**
   * @description Responsible for loading the metadata from MongoFB for a certain collection
   * @public
   * @param  {object} req NodeJS request obj
   * @param  {object} res NodeJS request obj
   * @return {json} the collection metadata, identifying its fields, descriptions and so on
   */
  getMetadata(req, res) {
    const params = req.params;
    queryBuilder.getCollectionMetadata(params.collection, function(doc) {
      res.json(doc);
    });
  };

  /**
   * @description Responsible for receiving a request with filters to query a specific
   * collection and return its data
   * @public
   * @param  {object} req NodeJS request obj
   * @return {json} the collection metadata, identifying its fields, descriptions and so on
   */
  searchDatasetData (req, res) {
    const req_data = this.parseRequestData(req.query);
    let response     = {};

    queryBuilder.getCollectionData(
      req_data.collection,
      req_data.fields,
      req_data.filters,
      req_data.pagination,
      req_data.groupBy,
      function(err, result) {
        response.rows = result.docs;
        response.numRows = result.count;
        res.json(response);
      }
    );
  }

  downloadDatasetFile(req, res) {
    const req_data = this.parseRequestData(req.query);
    let response     = {};

    queryBuilder.getCollectionData(
      req_data.collection,
      req_data.fields,
      req_data.filters,
      req_data.pagination,
      req_data.groupBy,
      function(err, result) {
        response.rows = result.docs;
        response.numRows = result.count;
        
        res.json(response);
      }
    );
  	// let req_data = req.query;
  	// res.download(config.fs.storage_folder+req_data.file);
  }

  parseRequestData(data) {
    let req_data   = this.parseRecursiveJSON(data);
  	let collection = req_data.collection;
  	let fields     = req_data.fields || [];
  	let filters    = req_data.filters || [];
  	let groupBy    = req_data.groupBy;
  	let pagination = req_data.pagination;

    if (!Array.isArray(filters)) {
      filters = [filters]; // cast it to array
    };
    if (!Array.isArray(fields)) {
      filters = [filters]; // cast it to array
    };

    return {
      collection,
      fields,
      filters,
      groupBy,
      pagination,
    };
  }

  parseRecursiveJSON(data) {
    if (typeof data == 'object') {
      for (var key in data) {
       if (data.hasOwnProperty(key)) {
  	     data[key] = this.parseRecursiveJSON(data[key]);
       }
      }
      return data;
    } else if (typeof data == 'string') {
      try {
      	return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  }

  _saveDatasetFile(data, fields, collection, extension) {
  	const directory = generateStoragePath();
  	const time = dateFormat("HHmmss");
  	const file_name = '/'+collection+'_'+time+'.'+extension;

  	fs.mkdir(directory.full_path, '0777', true, function (err) {
  		if (err)
  			console.log(err);
  		else{
  			if( extension == 'js' ){
  				fs.writeFile(directory.full_path+file_name, data, function(err) {
  					if (err)
  						throw err;
  				});
  			}else{
  				json2csv({data: data, fields: fields, del: ';'}, function(err, csv) {
  					fs.writeFile(directory.full_path+file_name, csv, function(err) {
  						if (err)
  							throw err;
  					});
  				});
  			}
  		}
  	});

  	return directory.relative_path+file_name;
  }

  _generateStoragePath() {
  	const year = dateFormat("yyyy");
  	const month = dateFormat("mm");
  	const day = dateFormat("dd");
  	const relative_path 	= year+'/'+month+'/'+day;
  	return { relative_path: relative_path, full_path: config.fs.storage_folder+relative_path };
  }

}

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
