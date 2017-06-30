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
const Member = require('../models/member');

let address;
Address.findOne({street: "Mircea cel Batrin"}, (err, item) => {
  address = item;

});

const createMembers = Member.remove({}, function(err) {
  const first = new Member({
    _id: '5768493048675643',
    language: "ru",
    address: address
  });

  const second = new Member({
    _id: '86849406758430986',
    language: "ru",
    address: address
  });

  const third = new Member({
    _id: '486957364860383557',
    language: "ru",
    address: address
  });


  first.save(function(err, member) {
    if(err) return logger.error(err);
    else logger.info("New member -", member._id);
  });

  second.save(function(err, member) {
    if(err) return logger.error(err);
    else logger.info("New member -", member._id);
  });

  third.save(function(err, member) {
    if(err) return logger.error(err);
    else logger.info("New member -", member._id);
  });
});

createMembers

setTimeout(function() {
  mongoose.disconnect();
}, 3000);

module.exports = createMembers;