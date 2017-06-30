/**
 * Created by palzuncoff on 5/30/17.
 */

const mongoose = require('../bin/dbinit');
const async = require('async');
const Logger = require('../logger');
const logger = new Logger();

const createCategories = require('./categories');
const createAddresses = require('./addresses');
const createPartners = require('./partners');
const createGifts = require('./gifts');
const createMembers = require('./members');
const createOrders = require('./orders');

const Partner = require('../models/partner');
const Address = require('../models/address');
const Order = require('../models/order');
const Member = require('../models/member');
const Gift = require('../models/gift');

mongoose.set('debug', true);



open;
dropDatabase;
createCategories;
createAddresses;
Partners;
Gifts;
Members;
Orders;

function open(callback){
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  const db = mongoose.connection.db;
  db.dropDatabase(callback);
}



function Gifts(callback) {
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

  Gift.remove({}, function(err) {
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

};



function Partners() {
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

  Partner.remove({}, function(err) {
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
};

function Members() {
  let address;
  Address.findOne({street: "Mircea cel Batrin"}, (err, item) => {
    address = item;

  });

  Member.remove({}, function(err) {
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
};


function Orders() {
  const sender = '86849406758430986';
  const receiver = '5768493048675643';

  let gift;

  Gift.findOne({nameEn: "Pizza peperoni"}, (err, item) => {
    gift = item;
  });


  Order.remove({}, function(err) {
    const first = new Order({
      sender: sender,
      receiver: receiver,
      order: "12345678901234567890",
      gift: gift
    });

    const second = new Order({
      sender: sender,
      receiver: receiver,
      order: "12345678901234567890",
      gift: gift
    });

    const third = new Order({
      sender: sender,
      receiver: receiver,
      order: "12345678901234567890",
      gift: gift
    });


    first.save(function(err, order) {
      if(err) return logger.error(err);
      else logger.info("New order -", order._id);
    });

    second.save(function(err, order) {
      if(err) return logger.error(err);
      else logger.info("New order -", order._id);
    });

    third.save(function(err, order) {
      if(err) return logger.error(err);
      else logger.info("New order -", order._id);
    });
  });
}