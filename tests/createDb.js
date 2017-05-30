/**
 * Created by palzuncoff on 5/30/17.
 */

const mongoose = require('../bin/dbinit');
const async = require('async');
const Logger = require('../logger');
const logger = new Logger();

mongoose.set('debug', true);


async.series([
  open,
  dropDatabase,
  requireModels,
  createGifts
], function (err, results) {
  logger.log(arguments);
  mongoose.disconnect();
});

function open(callback){
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  const db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function requireModels(callback) {
  require('../models/gift');

  async.each(Object.keys(mongoose.models), function(modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createGifts(callback) {
  const gifts = [
    { name: "Pizza Peperony", price: 85 },
    { name: "Beer Chisinau", price: 30 },
    { name: "Strapon Troian", price: 1200 }
  ];

  async.each(gifts, function (giftData, callback) {
    let gift = new mongoose.models.Gift(giftData);
    gift.save(callback);
  }, callback);
}