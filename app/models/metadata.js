"use strict";

var schema = new Schema({
  _id: Schema.ObjectId,
  field: "string",
  type: "string",
  description: "string"
});

var Metadata_m = mongoose.model('metadata', schema, 'metadata');
