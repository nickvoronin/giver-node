const express = require('express');
const router = express.Router();

const Authentication = require('../controllers/authentication');

router.post('/', Authentication.signup);


module.exports = router;