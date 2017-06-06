/**
 * Created by palzuncoff on 6/6/17.
 */
const express = require('express');
const router = express.Router();

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireSignin = passport.authenticate('local', {session: false});

router.post('/', requireSignin, Authentication.signin);


module.exports = router;