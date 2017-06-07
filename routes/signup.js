const express = require('express');
const router = express.Router();

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('bearer', {session: false});

router.post('/', Authentication.signup);


module.exports = router;