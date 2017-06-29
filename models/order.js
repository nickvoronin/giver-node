/**
 * Created by palzuncoff on 6/28/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;
const uuid = require('uuid/v1');
const Gift = require('./gift');
const User = require('./user');
const Member = require('./member');
const Address = require('./address');

const schema = new Schema({
    _id: {
      type: String,
      default: uuid()
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    isSurprise: {
      type: Boolean,
      default: false
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    isTaken: {
      type: Boolean,
      default: false
    },
    additionalDeliveryAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    deliveryTime: {
      type: Date
    },
    provided: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    unpacked: {
      type: Boolean,
      default: false
    },
    order: {
      type: String,
      minlength: 10,
      maxlength: 40
    },
    gift: {
      type: Schema.Types.ObjectId,
      ref: 'Gift'
    },

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', schema);