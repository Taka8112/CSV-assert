'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var datas = new mongoose.Schema({
  name: { type: String, required: true },
  geo: { 
    type : { type : String, default : 'Point'},
    coordinates : []
  },
  created_at : {
    type : Date,
  default : Date.now
  },
  image: { img: Buffer }
});

datas.index({geo: '2dsphere'});
module.exports = mongoose.model('Datas', datas);
