const express = require('express');
const router = express.Router();

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('bearer', {session: false});


/* GET home page. */
router.get('/', requireAuth, function(req, res) {
  res.json({ user_id: req.user.userId, name: req.user.email, scope: req.authInfo.scope });
});

module.exports = router;
