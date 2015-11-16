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
  image: {
    filename: {
      type: String
    },
    mimetype: {
      type: String,
      enum:['image/jpeg','image/gif','image/png','image/bmp','image/jpg']
    },
    buffer: {
      type: Buffer,
    default: null
    }
  }
});

datas.index({geo: '2dsphere'});
module.exports = mongoose.model('Datas', datas);
