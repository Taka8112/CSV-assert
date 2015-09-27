'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var members = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type : String, required: true },
  password: { type : String, required: true }
});

module.exports = mongoose.model('Members', members);
