/**
 * Created by palzuncoff on 6/29/17.
 */
const Logger = require('../logger');
const logger = new Logger();
const mongoose = require('../bin/dbinit');
const faker = require('Faker');
const config = require('../config');
const Adsress = require('../models/address');

Adsress.remove({}, function(err) {
  const first = new Adsress({
    country: "Moldova",
    provance: "Chisinau",
    city: "Chisinau",
    street: "M. Costin",
    house: "18",
    apartment: "12",
    phone: "+37369094687",
    website:"posotronbohemia.com",
    latitude: 55.755831,
    longitude: 37.617673
  });

  const second = new Adsress({
    country: "Moldova",
    provance: "Chisinau",
    city: "Chisinau",
    street: "Stefsn cel Mare",
    house: "81",
    apartment: "12",
    phone: "+37369094687",
    website:"posotronbohemia.com",
    latitude: 55.755831,
    longitude: 37.617673
  });

  const third = new Adsress({
    country: "Moldova",
    provance: "Chisinau",
    city: "Chisinau",
    street: "Mircea cel Batrin",
    house: "78",
    apartment: "89",
    phone: "+37369094687",
    website:"posotronbohemia.com",
    latitude: 55.755831,
    longitude: 37.617673
  });


  first.save(function(err, address) {
    if(err) return logger.error(err);
    else logger.info("New address -", address.street);
  });

  second.save(function(err, address) {
    if(err) return logger.error(err);
    else logger.info("New address -", address.street);
  });

  third.save(function(err, address) {
    if(err) return logger.error(err);
    else logger.info("New address -", address.street);
  });
});

setTimeout(function() {
  mongoose.disconnect();
}, 3000);