'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var SpawnPoint = require('../models/SpawnPoint');

var POKEMONGO_MAP_FIELDS = [
  'spawnpoint_id',
  'pokemon_id',
  'latitude',
  'longitude',
  'disappear_time',
];

router.post('/', function(req, res) {
  let inputData = req.body;

  if (typeof inputData !== 'object') {
    res.status(400).json({error: 'JSON body is required.'});
    return;
  }
  if ('message' in inputData)
    inputData = inputData.message;

  let parsedData = _.pick(
    inputData,
    POKEMONGO_MAP_FIELDS
  );

  if (_.size(parsedData) === POKEMONGO_MAP_FIELDS.length) {
    let spawnPoint = new SpawnPoint({
      _id: parsedData.spawnpoint_id + ':' + parsedData.disappear_time,
      disappearTime: parsedData.disappear_time * 1000,
      loc: {
        type: 'Point',
        coordinates: [parsedData.longitude, parsedData.latitude]
      },
      pokemonId: parseInt(parsedData.pokemon_id),
      spawnPointId: parsedData.spawnpoint_id
    });
    spawnPoint.save(function(error) {
      if (error && error.code !== 11000)
        console.error(error);
    });

    res.json({success: true});
  } else {
    res.status(400).json({
      error: 'Following fields are required: ' + POKEMONGO_MAP_FIELDS.join(', ')
    });
  }
});

module.exports = router;
