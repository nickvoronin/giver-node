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

const streets = [
  {street: "M. Costin"},
  {street: "Stefsn cel Mare"},
  {street: "Mircea cel Batrin"}
];

let adresses = [];

streets.forEach((item) => {
  Address.findOne(item, function (err, address) {
    adresses.push(address);
  });
});


logger.info(adresses);

const createPartners = Partner.remove({}, function(err) {
  const first = new Partner({
    name: "Andys Pizza",
    description: "Pizza restaurant",
    address: adresses
  });

  const second = new Partner({
    name: "Autobus",
    description: "Beer pub",
    address: adresses
  });

  const third = new Partner({
    name: "Medalmir",
    description: "construction company",
    address: adresses
  });


  first.save(function(err, partner) {
    if(err) return logger.error(err);
    else logger.info("New partner -", partner.name);
  });

  second.save(function(err, partner) {
    if(err) return logger.error(err);
    else logger.info("New partner -", partner.name);
  });

  third.save(function(err, partner) {
    if(err) return logger.error(err);
    else logger.info("New partner -", partner.name);
  });
});

createPartners;


setTimeout(function() {
  mongoose.disconnect();
}, 3000);

module.exports = createPartners;