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
  return checkUserPermissions(req.user, "manageUsers")
    .then((allowed) => {
      if (allowed) {
        User.find({})
          .then((users)=> {
            res.json(users.map((user) => {
              const userObj = user.toObject();
              delete userObj.hashedPassword;
              delete userObj.salt;
              return userObj;
            }));
          })

          .catch((err )=> {
            return next(err);
          });
      } else {
        res.send(httpStatus.FORBIDDEN);
      };

    })

    .catch((err) => {
      throw new Error(err);
    });
});

/* POST add user */
router.post('/', requireAuth, userMiddleware.validateUserDoesNotExist, function (req, res, next) {
  return checkUserPermissions(req.user, "manageUsers")
    .then((allowed) => {
      if (allowed) {
        const user = new User({
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          email: req.body.email,
          phone: req.body.phone,
          fullName: req.body.fullName,
          organization: req.body.organization
        });
        user.save()
          .then((user) => {
            const userObj = user.toObject();
            delete userObj.hashedPassword;
            delete userObj.salt;
            res.json(userObj);
          })

          .catch((err) => {
            return next(err);
          });
      } else {
        res.send(httpStatus.FORBIDDEN);
      };

    })

    .catch((err) => {
      throw new Error(err);
    });

});


/* GET user detail view*/
router.get('/:id', requireAuth, function (req, res, next) {
  return checkUserPermissions(req.user, "manageUsers")
    .then((allowed) => {
      if (allowed) {
        User.findById(req.params.id)
          .then((user) => {
            if (!user) return res.send(httpStatus.NOT_FOUND);

            const userObj = user.toObject();
            delete userObj.hashedPassword;
            delete userObj.salt;
            res.json(userObj);
          })

          .catch((err) => {
            return next(err);
          });

      } else {
        res.send(httpStatus.FORBIDDEN);
      };

    })

    .catch((err) => {
      throw new Error(err);
    });
});



/* PUT edit user, dosen't change pass*/
router.put('/:id', requireAuth, function (req, res, next) {
  return checkUserPermissions(req.user, "manageUsers")
    .then((alowed) => {
      if (alowed) {
        User.findByIdAndUpdate(req.params.id, {
          username: req.body.username,
          role: req.body.role,
          email: req.body.email,
          phone: req.body.phone,
          fullName: req.body.fullName,
          organization: req.body.organization
        })
          .then((user) => {
            if (!user) return res.send(httpStatus.NOT_FOUND);
            logger.info("Updated user", user.username);
            res.status(200).end();
          })

          .catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000) {
              // Duplicate username
              return res.status(500).send({ succes: false, message: 'User already exist!' });
            }
            return next(err);
            // return res.status(500).send({ error: 'Server error' });
          });
      } else {
        res.send(httpStatus.FORBIDDEN);
      }
    })

    .catch((err) => {
      throw new Error(err);
    });

});


router.delete('/:id', requireAuth, function (req, res, next) {
  return checkUserPermissions(req.user, "manageUsers")
    .then((allowed) => {
      if (allowed) {
        User.findByIdAndRemove(req.params.id)
          .then(() => {
            logger.info("Deleted user");
            res.status(200).end();
          })

          .catch((err) => {
            return next(err);
          });

      } else {
        res.send(httpStatus.FORBIDDEN);
      }
    })

    .catch((err) => {
      throw new Error(err);
    });
});


module.exports = router;
