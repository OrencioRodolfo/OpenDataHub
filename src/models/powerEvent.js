var schema = new Schema({
	_id: Schema.ObjectId,
	iid: Number,
	tmstp: String,
	deploy: Number,
	delta_P: Number,
  delta_Q: Number,
  trace_P: Number,
  trace_Q: Number
});

var PowerEvent_m 	= mongoose.model('power_event', schema, 'power_event');
