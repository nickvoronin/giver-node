/**
 * Created by palzuncoff on 6/16/17.
 */


const permissions = require('../permissions');
const User = require('../models/user');
const Logger = require('../logger');
const logger = new Logger();


module.exports = function checkUserPermissions(user, action) {
  return User.findOne({username: user.username})
             .then((user) => {
                if (!user) return res.status(404).send({success: false, message: 'User not exist'});

                const userObj = user.toObject();
                const role = userObj.role;
                const allowed = permissions[role][action];
                return allowed;
             })

             .catch((err) => {
                logger.error(err);
                return false;
             });
};