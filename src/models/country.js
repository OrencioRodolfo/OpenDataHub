var country_schema = new Schema({
	_id: Schema.ObjectId,
	name: String
});

var Country_m 	= mongoose.model('country', country_schema, 'country');
