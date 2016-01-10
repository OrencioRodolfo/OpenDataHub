var activity_log_schema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	activity: {
		type: Schema.ObjectId,
		ref: 'activity'
	},
	obs: String,
	tmstp: String
});


var ActivityLog_m  = mongoose.model('activity_log', activity_log_schema, 'activity_log');
