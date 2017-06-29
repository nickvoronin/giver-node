/**
 * Created by palzuncoff on 5/26/17.
 */
/**
 * Created by palzuncoff on 5/22/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;
const Img = require('./img');
const Category = require('./category');
const Partner = require('./partner');

let schema = new Schema({
  nameEn: {
    type: String,
    maxlength:[100,"tooLong"],
    minlength:[2,"tooShort"]
  },
  nameRo: {
    type: String,
    maxlength:[100,"tooLong"],
    minlength:[2,"tooShort"]
  },
  nameRu: {
    type: String,
    maxlength:[100,"tooLong"],
    minlength:[2,"tooShort"]
  },
  descriptionEn: {
    type: String,
    minlength:[2,"tooShort"]
  },
  descriptionRo: {
    type: String,
    minlength:[2,"tooShort"]
  },
  descriptionRu: {
    type: String,
    minlength:[2,"tooShort"]
  },
  shortDescriptionEn: {
    type: String,
    minlength:[2,"tooShort"]
  },
  shortDescriptionRo: {
    type: String,
    minlength:[2,"tooShort"]
  },
  shortDescriptionRu: {
    type: String,
    minlength:[2,"tooShort"]
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
  },
  galery: [{
    type: Schema.Types.ObjectId,
    ref: 'Img'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  partners: [{
    type: Schema.Types.ObjectId,
    ref: 'Partner'
  }]
});

module.exports = mongoose.model('Gift', schema);


