/**
 * Created by palzuncoff on 6/5/17.
 */
const jwt = require('jwt-simple');
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
server.exchange(oauth2orize.exchange.password(function(client, email, password, scope, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!user.comparePassword(password)) return done(null, false);

    RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });
    AccessToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });

    const tokenValue = crypto.randomBytes(32).toString('base64');
    const refreshTokenValue = crypto.randomBytes(32).toString('base64');
    const token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
    const refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
    refreshToken.save(function (err) {
      if (err) return done(err);
    });
    const info = { scope: '*' }
    token.save(function (err, token) {
      if (err) { return done(err); }
      done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
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

      const tokenValue = crypto.randomBytes(32).toString('base64');
      const refreshTokenValue = crypto.randomBytes(32).toString('base64');
      const token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
      const refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
      refreshToken.save(function (err) {
        if (err) { return done(err); }
      });
      const info = { scope: '*' }
      token.save(function (err, token) {
        if (err) { return done(err); }
        done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
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





function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.security.secret);
}

exports.signin = function (req, res, next) {
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({error: 'Yuo mast provide email and password'});
  }

  User.findOne({email: email}, function (err, existingUser) {
    if (err) return next(err);
    if(existingUser) {
      return res.status(422).send({error: 'Email in use'});
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save((err)=> {
      if (err) return next(err);

      res.json({token: tokenForUser(user)});
    });
  });
}