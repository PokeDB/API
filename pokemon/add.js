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
    res.status(400).json({ error: 'Json body is required' });
    return;
  }
  if ('message' in inputData)
    inputData = inputData.message

  let parsedData = _.pick(
    inputData,
    POKEMONGO_MAP_FIELDS
  );

  if (_.size(parsedData) !== POKEMONGO_MAP_FIELDS.length) {
    res.status(400).json({error: 'Unknown data format.'});
  } else {
    let spawnPoint = new SpawnPoint({
      _id: parsedData.spawnpoint_id + ':' + parsedData.disappear_time,
      spawnPointId: parsedData.spawnpoint_id,
      pokemonId: parseInt(parsedData.pokemon_id),
      loc: {
        type: 'Point',
        coordinates: [parsedData.longitude, parsedData.latitude]
      },
      disappearTime: parsedData.disappear_time * 1000
    });
    spawnPoint.save(function(error) {
      if (error && error.code !== 11000)
        console.error(error);
    });

    console.log(parsedData);

    res.json({
      success: true
    });
  }
});

module.exports = router;
