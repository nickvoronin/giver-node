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
const config = require('../config');

User.remove({}, function(err) {
  const user = new User({ username: "admin", password: "297604200", role: "superUser" });
  user.save(function(err, user) {
    if(err) return logger.error(err);
    else logger.info("New user - %s:%s",user.username, user.password);
  });

  for(i=0; i<4; i++) {
    let user = new User({ username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0], role: 'webMaster' });
    user.save(function(err, user) {
      if(err) return logger.error(err);
      else logger.info("New user - %s:%s", user.username, user.password);
    });
  }
});

Client.remove({}, function(err) {
  const client = new Client({ name: config.security.name, clientId: config.security.id, clientSecret: config.security.secret });
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