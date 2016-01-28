'use strict';

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

function PowerEventClass() {}

PowerEventClass.prototype.test = "teste";

PowerEventClass.prototype.buy_food = function () {
   // something here
};

PowerEventClass.prototype.use_restroom = function () {
   // something here
};

exports.PowerEventClass = new PowerEventClass();

var PowerEvent_m = mongoose.model('power_event', schema, 'power_event');
