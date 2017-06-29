/**
 * Created by palzuncoff on 6/28/17.
 */
const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;
const Address = require('./address');

const schema = new Schema({
  name: {
    type: String,
    required:[true,"nameRequired"]
  },
  logo: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String
  },
  address: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }]
});

module.exports = mongoose.model('Partner', schema);