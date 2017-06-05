/**
 * Created by palzuncoff on 6/5/17.
 */
const User = require('../models/user');

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

      res.json({success: true});
    });
  });
}