/**
 * Created by palzuncoff on 5/26/17.
 */
/**
 * Created by palzuncoff on 5/22/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;

let schema = new Schema({
  name: {
    type: String,
    maxlength:[100,"tooLong"],
    minlength:[2,"tooShort"],
    required:[true,"giftNameRequired"]
  },
  price: {
    type: Number,
    required:[true,"giftPriceRequired"]
  },
  end_offer_date: {
    type: Date
  },
  is_offer_avalabale: {
    type: Boolean,
    default: true
  },
  is_delivery: {
    type: Boolean,
    default: false
  },
  is_hot_offer: {
    type: Boolean,
    default: false
  },
  pub_date: {
    type: Date,
    default: Date.now
  },
  discount: {
    type: Number
  },
  preview: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Gift', schema);


