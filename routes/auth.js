/**
 * Created by palzuncoff on 5/30/17.
 */

const express = require('express');
const router = express.Router();

const models = require('./../models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
router.get('/login',function(req,res,next)
{
  if(req.user) return res.redirect('/');

  res.render('login',{
    user:req.user
  });
});

module.exports = router;
