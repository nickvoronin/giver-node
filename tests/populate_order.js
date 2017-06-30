/**
 * Created by palzuncoff on 6/30/17.
 */
const Logger = require('../logger');
const logger = new Logger();
const mongoose = require('../bin/dbinit');
const faker = require('Faker');
const config = require('../config');
const Partner = require('../models/partner');
const Address = require('../models/address');
const Order = require('../models/order');
const Member = require('../models/member');
const Gift = require('../models/gift');

Order.findById('59560ea1f3fa1a42953fc631')
  .populate('sender')
  .exec(function (err, order) {
  if (err) return logger.error(err);
    logger.info("New member -", order.sender.isMale);
  // prints "The creator is Aaron"
});

setTimeout(function() {
  mongoose.disconnect();
}, 3000);