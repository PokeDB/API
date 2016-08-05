'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var SpawnPoint = require('../models/SpawnPoint');

router.get('/', function(req, res) {
  let
    query = req.query,
    lat = parseInt(query.lat),
    long = parseInt(query.long),
    maxDistance = query.maxDistance || 5;

  if (lat && long) {
    SpawnPoint.geoNear([lat, long], { maxDistance : maxDistance, spherical : true })
      .then((results) => {
        res.json({
          data: results
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        });
      })
  } else {
    res.status(400).json({
      error: 'lat and long are required params'
    });
  }
});

module.exports = router;
