/**
 * Created by palzuncoff on 6/5/17.
 */
const User = require('../models/user');
const config = require('../config');
//Bearer
const oauth2orize = require('oauth2orize');
const passport = require('passport');
const crypto = require('crypto');
const Client = require('../models/client');
const AccessToken = require('../models/access_token');
const RefreshToken = require('../models/refresh_token');


const server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!user.checkPassword(password)) return done(null, false);

    RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });
    AccessToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });

    let tokenValue = crypto.randomBytes(32).toString('base64');
    let refreshTokenValue = crypto.randomBytes(32).toString('base64');
    let token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
    let refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
    refreshToken.save(function (err) {
      if (err) return done(err);
    });
    let info = { scope: '*' }
    token.save(function (err, token) {
      if (err) { return done(err); }
      done(null, tokenValue, refreshTokenValue, { 'expires_in': config.security.tokenLife });
    });
  });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
  RefreshToken.findOne({ token: refreshToken }, function(err, token) {
    if (err) return done(err);
    if (!token) return done(null, false);
    if (!token) return done(null, false);

    User.findById(token.userId, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);

      RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
        if (err) return done(err);
      });
      AccessToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
        if (err) return done(err);
      });

      let tokenValue = crypto.randomBytes(32).toString('base64');
      let refreshTokenValue = crypto.randomBytes(32).toString('base64');
      let token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
      let refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
      refreshToken.save(function (err) {
        if (err) { return done(err); }
      });
      let info = { scope: '*' }
      token.save(function (err, token) {
        if (err) { return done(err); }
        done(null, tokenValue, refreshTokenValue, { 'expires_in': config.security.tokenLife });
      });
    });
  });
}));


// token endpoint
exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
];

