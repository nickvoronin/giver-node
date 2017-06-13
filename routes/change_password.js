/**
 * Created by palzuncoff on 6/13/17.
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const Logger = require('../logger');
const logger = new Logger();

const requireAuth = passport.authenticate('bearer', {session: false});


/* PUT change-pass */
router.put('/:id', requireAuth, function (req, res, next) {
  User.findById(
    req.params.id,
    (err, user) => {
      if (err) {
        return next(err);
        // return res.status(500).send({ error: 'Server error' });
      }
      user.password = req.body.password;
      user.save((err, user) => {
        if (err) return next(err);
        logger.info("New users ",user.username);
        res.status(200).end();
      });
    }
  );
});


module.exports = router;
