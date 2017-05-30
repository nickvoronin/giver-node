/**
 * Created by palzuncoff on 5/30/17.
 */

const Gift = require('../models/gift');
const express = require('express');
const router = express.Router();
// const HttpError = require('error').HttpError;

router.get('/', function (req, res, next) {
  Gift.find({}, function (err, gifts) {
    if (err) return next(err);
    res.json(gifts);
  })
})

router.get('/:id', function (req, res, next) {
  Gift.findById(req.params.id, function (err, gifts) {
    if (err) return next(err);
    if (!gifts) {
      return next(err);
    }
    res.json(gifts);
  });
});

module.exports = router;