/**
 * Created by palzuncoff on 6/7/17.
 */
const express = require('express');
const router = express.Router();

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');


router.post('/', Authentication.token);


module.exports = router;