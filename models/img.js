/**
 * Created by palzuncoff on 6/28/17.
 */

const mongoose = require('../bin/dbinit');
const Schema = mongoose.Schema;

let schema = new Schema ({
  preview: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Img', schema);