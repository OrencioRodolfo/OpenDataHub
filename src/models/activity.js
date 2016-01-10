var activity_schema = new Schema({
	id: Number,
	description: String
});


var Activity_m = mongoose.model('activity', activity_schema, 'activity');
