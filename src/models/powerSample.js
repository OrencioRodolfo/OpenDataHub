var schema = new Schema({
	_id: Schema.ObjectId,
	deploy: Number,
	iid: Number,
	tmstp: String,
	Imin: Number,
	Imax: Number,
	Iavg: Number,
	Vmin: Number,
	Vmax: Number,
	Vavg: Number,
	Pmin: Number,
	Pmax: Number,
	Pavg: Number,
	Qmin: Number,
	Qmax: Number,
	Qavg: Number,
	PFmin: Number,
	PFmax: Number,
	PFavg: Number,
	miss_flag: Number
});

var PowerSample_m 	= mongoose.model('power_sample', schema, 'power_sample');

