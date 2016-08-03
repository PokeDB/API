'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({success: false});
});

var POKEMONGO_MAP_FIELDS = [
    'encounter_id', 'spawnpoint_id', 'pokemon_id', 'latitude',
    'longitude', 'disappear_time', 'time_until_hidden_ms',
    'last_modified_time'
  ];

router.post('/', function(req, res) {
  let rawData = req.body;

  if (!rawData) {
    res.status(400).json({ error: 'Json body is required' });

    return;
  }

  // PokemonGo-Map webhook format
  if ('type' in rawData && 'message' in rawData) {
    let
      parsedData = _.pick(
        rawData.message,
        POKEMONGO_MAP_FIELDS
      );

    // Add parsedData to db here
    console.log(parsedData);

    res.json({
      success: true
    });
  } else {
    res.status(400).json({ error: 'Unknown data format' });
  }
});

module.exports = router;
