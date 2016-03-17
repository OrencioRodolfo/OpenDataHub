var schema = new Schema({
	_id: Schema.ObjectId,
	collectionName: "string",
  description: "string",
	fields: []
});

var Metadata_m = mongoose.model('metadata', schema, 'metadata');
