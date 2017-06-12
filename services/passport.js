/**
 * Created by palzuncoff on 6/5/17.
 */
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
//Bearer strategy
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const Client = require('../models/client');
const AccessToken = require('../models/access_token');
const RefreshToken = require('../models/refresh_token');


//Bearer strategy
const basicStrategy = new BasicStrategy(
  function(username, password, done) {
    Client.findOne({ clientId: username }, function(err, client) {
      if (err) return done(err);
      if (!client) return done(null, false);
      if (client.clientSecret != password) return done(null, false);

      return done(null, client);
    });
  }
);


const clientPasswordStrategy = new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    Client.findOne({ clientId: clientId }, function(err, client) {
      if (err) return done(err);
      if (!client) return done(null, false);
      if (client.clientSecret != clientSecret) return done(null, false);

      return done(null, client);
    });
  }
);

const bearerStrategy = new BearerStrategy(
  function(accessToken, done) {
    AccessToken.findOne({ token: accessToken }, function(err, token) {
      if (err) return done(err);
      if (!token) return done(null, false);

      if( Math.round((Date.now()-token.created)/1000) > config.security.tokenLife ) {
        AccessToken.remove({ token: accessToken }, function (err) {
          if (err) return done(err);
        });
        return done(null, false, { message: 'Token expired' });
      }

      User.findById(token.userId, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Unknown user' });

        const info = { scope: '*' };
        done(null, user, info);
      });
    });
  }
);



//Bearer
passport.use(basicStrategy);
passport.use(clientPasswordStrategy);
passport.use(bearerStrategy);

