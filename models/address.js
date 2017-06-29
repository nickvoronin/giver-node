/**
 * Created by palzuncoff on 6/28/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;

const schema = new Schema({
  country: {
    type: String
  },
  provance: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String,
    default: "Viazov"
  },
  house: {
    type: String
  },
  apartment: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
});

module.exports = mongoose.model('Address', schema);