'use strict';

var environmental = new Schema({
	tmstp: String,
	station_id: Number,
	station: String,
	Temp: Number,
	Hum: Number,
	WS: Number,
	WD: String,
	Pre: Number,
	Cond: String
});

var Environmental_m = mongoose.model('environmental', environmental, 'environmental');
