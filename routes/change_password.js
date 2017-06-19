/**
 * Created by palzuncoff on 6/13/17.
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const Logger = require('../logger');
const logger = new Logger();
const httpStatus = require('http-status');
const checkUserPermissions = require('../utils/check_user_permissions');

const requireAuth = passport.authenticate('bearer', {session: false});


/* PUT change-pass */
router.put('/:id', requireAuth, function (req, res, next) {
  return checkUserPermissions(req.user, "manageUsers")
    .then((allowed) => {
      if (allowed) {
        User.findById(req.params.id)
          .then((user) => {
            if (!user) return res.send(httpStatus.NOT_FOUND);

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
      } else {
        res.send(httpStatus.FORBIDDEN);
      }

    })

    .catch((err) => {
      throw new Error(err);
    });

});


module.exports = router;
