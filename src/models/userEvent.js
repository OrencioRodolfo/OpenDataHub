var schema = new Schema({
	_id: Schema.ObjectId,
	iid: Number,
	tmstp: String,
	deploy: Number,
	type_id: Number,
	type_name: String,
	view_id: Number,
	view_name: String

});

var UserEvent_m 	= mongoose.model('user_event', schema, 'user_event');
