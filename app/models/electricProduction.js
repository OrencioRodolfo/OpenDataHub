'use strict';

var ElectricProduction = new Schema({
	id: Number,
	tmstp: String,
	total: Number,
	thermal: Number,
	hydro: Number,
	eolic: Number,
	biomass: Number,
	solar: Number
});

var ElectricProduction_m = mongoose.model('electric_production', ElectricProduction, 'electric_production');
