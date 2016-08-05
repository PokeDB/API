'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var SpawnPoint = require('../models/SpawnPoint');

router.get('/', function(req, res) {
  // Spawns around a point
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

router.get('/raw_data', function(req, res) {
  // Spawns within a box, map mode
  let
    query = req.query,
    neLat = parseInt(query.neLat),
    neLng = parseInt(query.neLng),
    seLat = parseInt(query.seLat),
    seLng = parseInt(query.seLng),
    maxDistance = query.maxDistance || 5;

  // TODO: use precond or other param checker, this will fail for 0
  if (neLat && neLng && seLat && seLng) {
    // TODO: flag to check expiry time
    SpawnPoint.where('loc')
      .within([neLat, neLng], [seLat, seLng])
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
