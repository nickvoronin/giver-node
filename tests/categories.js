/**
 * Created by palzuncoff on 6/29/17.
 */
const Logger = require('../logger');
const logger = new Logger();
const mongoose = require('../bin/dbinit');
const faker = require('Faker');
const config = require('../config');
const Category = require('../models/category');

const createCategories = Category.remove({}, function(err) {
  const food = new Category({ nameEn: "Food", nameRo: "mincare", nameRu: "Еда" });
  const drinks = new Category({ nameEn: "Drinks", nameRo: "bauturi", nameRu: "Напитки"  });
  const clothes = new Category({ nameEn: "Clothes", nameRo: "Haine", nameRu: "Одежда" });
  food.save(function(err, category) {
    if(err) return logger.error(err);
    else logger.info("New category - %s",category.nameEn);
  });

  drinks.save(function(err, category) {
    if(err) return logger.error(err);
    else logger.info("New category - %s",category.nameEn);
  });

  clothes.save(function(err, category) {
    if(err) return logger.error(err);
    else logger.info("New category - %s",category.nameEn);
  });
});

createCategories;

setTimeout(function() {
  mongoose.disconnect();
}, 3000);

module.exports = createCategories;