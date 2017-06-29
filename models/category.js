/**
 * Created by palzuncoff on 6/28/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;

let schema = new Schema({
  icon: {
    data: Buffer,
    contentType: String
  },
  nameEn: {
    type: String
  },
  nameRo: {
    type: String
  },
  nameRu: {
    type: String
  }
});

module.exports = mongoose.model('Category', schema);