/**
 * Created by palzuncoff on 6/14/17.
 */

const checkIfNameExists = require('../utils/check_if_name_exists');
const User           = require('../models/user');

// Validate if the given account exists in our DB
exports.validateUserDoesNotExist = (req, res, next) => {
  checkIfNameExists(User, {username: req.body.username}, (exists) => {
    if(!exists){
      next();
    } else {
      res.status(403).send({success: false, message: 'An account with this name already exists.'});
    }
  });
};
