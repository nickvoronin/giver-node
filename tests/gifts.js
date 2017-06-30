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
const Gift = require('../models/gift');
const Category = require('../models/category');

const categoryList = [
  {nameEn: "Food"},
  {nameEn: "Drinks"},
  { nameEn: "Clothes"}
];

let categories = [];

categoryList.forEach((item) => {
  Category.findOne(item, function (err, category) {
    categories.push(category);
  });
});


let partnerList = [
  {name: "Andys Pizza"},
  {name: "Autobus"},
  {name: "Medalmir"}
];

let partners = [];

partnerList.forEach((item) => {
  Partner.findOne(item, function (err, partner) {
    partners.push(partner);
  });
});

const createGifts = Gift.remove({}, function(err) {
  const first = new Gift({
    nameEn: "Pizza peperoni",
    nameRo: "Pizza peperoni",
    nameRu: "Пицца пеперони",
    descriptionEn: "Best pizza ever",
    descriptionRo: "Bun Pizza",
    descriptionRu: "Лучшая пицца",
    shortDescriptionEn: "Best pizza ever",
    shortDescriptionRo: "Bun Pizza",
    shortDescriptionRu: "Лучшая пицца",
    price: 22.3,
    categories: categories,
    partners: partners
  });

  const second = new Gift({
    nameEn: "Milkshake",
    nameRo: "Milkshake",
    nameRu: "Молочный коктель",
    descriptionEn: "Best Milkshake ever",
    descriptionRo: "Bun Milkshake",
    descriptionRu: "Лучший молочный коктель",
    shortDescriptionEn: "Best Milkshake ever",
    shortDescriptionRo: "Bun Milkshake",
    shortDescriptionRu: "Лучший молочный коктель",
    price: 221.3,
    categories: categories,
    partners: partners
  });

  const third = new Gift({
    nameEn: "Necklace",
    nameRo: "Colier",
    nameRu: "Пицца пеперони",
    descriptionEn: "Best necklace ever",
    descriptionRo: "Bun colier",
    descriptionRu: "Лучшее колье",
    shortDescriptionEn: "Best necklace ever",
    shortDescriptionRo: "Bun colier",
    shortDescriptionRu: "Лучшее колье",
    price: 22.3,
    categories: categories,
    partners: partners
  });


  first.save(function(err, gift) {
    if(err) return logger.error(err);
    else logger.info("New gift -", gift.nameEn);
  });

  second.save(function(err, gift) {
    if(err) return logger.error(err);
    else logger.info("New gift -", gift.nameEn);
  });

  third.save(function(err, gift) {
    if(err) return logger.error(err);
    else logger.info("New gift -", gift.nameEn);
  });
});

createGifts;

setTimeout(function() {
  mongoose.disconnect();
}, 3000);

module.exports = createGifts;