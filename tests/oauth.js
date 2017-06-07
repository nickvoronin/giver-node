/**
 * Created by palzuncoff on 6/7/17.
 */
const Logger = require('../logger');
const logger = new Logger();
const mongoose = require('../bin/dbinit');
const User = require('../models/user');
const Client = require('../models/client');
const AccessToken = require('../models/access_token');
const RefreshToken = require('../models/refresh_token');
const faker = require('Faker');

User.remove({}, function(err) {
  const user = new User({ email: "test@yahoo.com", password: "simplepassword" });
  user.save(function(err, user) {
    if(err) return logger.error(err);
    else logger.info("New user - %s:%s",user.email, user.password);
  });

  for(i=0; i<4; i++) {
    let user = new User({ email: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0] });
    user.save(function(err, user) {
      if(err) return logger.error(err);
      else logger.info("New user - %s:%s", user.email, user.password);
    });
  }
});

Client.remove({}, function(err) {
  const client = new Client({ name: "OurService iOS client v1", clientId: "mobileV1", clientSecret:"abc123456" });
  client.save(function(err, client) {
    if(err) return logger.error(err);
    else logger.info("New client - %s:%s",client.clientId,client.clientSecret);
  });
});
AccessToken.remove({}, function (err) {
  if (err) return logger.error(err);
});
RefreshToken.remove({}, function (err) {
  if (err) return logger.error(err);
});

setTimeout(function() {
  mongoose.disconnect();
}, 3000);