const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const Logger = require('../logger');
const logger = new Logger();
const userMiddleware = require('../middleware/user');
const httpStatus = require('http-status');
const checkUserPermissions = require('../utils/check_user_permissions');
// const permissonsMiddleware = require('../middleware/permissions');
const permissions = require('../permissions');

const requireAuth = passport.authenticate('bearer', {session: false});

/* GET users listing. */
router.get('/', requireAuth, function(req, res, next) {
  User.find({})
    .then((users) => {

      return checkUserPermissions(req.user, "manageUsers")
        .then((allowed) => {
          if (allowed) {
            res.json(users.map((user) => {
              const userObj = user.toObject();
              delete userObj.hashedPassword;
              delete userObj.salt;
              return userObj;
            }));
          } else {
            res.send(httpStatus.FORBIDDEN);
          };
        })

        .catch((err) => {
          throw new Error(err);
        });
    })

      .catch((err )=> {
       return next(err);
       });
});


/* POST add user */
router.post('/', requireAuth, userMiddleware.validateUserDoesNotExist, function (req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });
  user.save((err, user) => {
    if (err) return next(err);

    const userObj = user.toObject();
    delete userObj.hashedPassword;
    delete userObj.salt;
    res.json(userObj);
  });
});


/* GET user detail view*/
router.get('/:id', requireAuth, function (req, res, next) {
  User.findById(req.params.id)
      .then((user) => {
        if (!user) return next(err);

        const userObj = user.toObject();
        delete userObj.hashedPassword;
        delete userObj.salt;
        res.json(userObj);
      })

    .catch((err) => {
      return next(err);
    });
});


/* PUT edit user, dosen't change pass*/
router.put('/:id', requireAuth, userMiddleware.validateUserDoesNotExist, function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, {username: req.body.username})
      .then((user) => {
        if (!user) return next(err);
        logger.info("Updated user", user.username);
        res.status(200).end();
      })

      .catch((err) => {
          return next(err);
         // return res.status(500).send({ error: 'Server error' });
      });
});


router.delete('/:id', requireAuth, function (req, res, next) {
  User.findByIdAndRemove(
    req.params.id,
    (err) => {
      if (err) return next(err);

      logger.info("Deleted user");
      res.status(200).end();
    }
  );
});


module.exports = router;
