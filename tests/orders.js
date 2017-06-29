/**
 * Created by palzuncoff on 6/29/17.
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

//let sender, receiver, gift;

const sender = Member.findById(5768493048675643, function (err, member) {
  return member;
});

const receiver = Member.findById({_id: 5768493048675643}, function (err, member) {
  return member;
});

const gift = Gift.findOne({nameEn: "Pizza peperoni"}, function (err, item) {
  return item;
});

logger.info(receiver);
logger.info(sender);
logger.info(gift);


Order.remove({}, function(err) {
  const first = new Order({
    sender: sender,
    receiver: receiver,
    order: "12345678901234567890",
    gift: gift
  });

  // const second = new Order({
  //   sender: sender,
  //   receiver: receiver,
  //   order: "12345678901234567890",
  //   gift: gift
  // });
  //
  // const third = new Order({
  //   sender: sender,
  //   receiver: receiver,
  //   order: "12345678901234567890",
  //   gift: gift
  // });


  first.save(function(err, order) {
    if(err) return logger.error(err);
    else logger.info("New order -", order._id);
  });

  // second.save(function(err, order) {
  //   if(err) return logger.error(err);
  //   else logger.info("New order -", order.name);
  // });
  //
  // third.save(function(err, order) {
  //   if(err) return logger.error(err);
  //   else logger.info("New order -", order.name);
  // });
});

setTimeout(function() {
  mongoose.disconnect();
}, 3000);
