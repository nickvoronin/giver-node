/**
 * Created by palzuncoff on 6/28/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;
const Address = require('./address');
const Gift = require('./gift');

const schema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 3
  },
  fullName: {
    type: String
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  isMale: {
    type: Boolean,
    default: true
  },
  birthday: {
    type: Date
  },
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Gift'
  }],
  credit: {
    type: Number
  }
});

schema.virtual('age')
  .get(() => {
    return Date.now() - birthday.getTime();
  });

module.exports = mongoose.model('Member', schema);