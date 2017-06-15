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
  User.findById(req.params.id)
      .then((user) => {
        user.password = req.body.password;
        user.save()
      })

      .then((user) => {
        logger.info("New password for user ",req.params.id);
        res.status(200).end();
      })

      .catch((err) => {
       return next(err);
      })
});


module.exports = router;
