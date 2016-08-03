'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();

var POKEMONGO_MAP_FIELDS = [
  'spawnpoint_id',
  'pokemon_id',
  'latitude',
  'longitude',
  'disappear_time',
];

router.post('/', function(req, res) {
  let rawData = req.body;

  if (!rawData) {
    res.status(400).json({ error: 'Json body is required' });
    return;
  }

  // PokemonGo-Map webhook format
  if ('type' in rawData && 'message' in rawData) {
    let parsedData = _.pick(
      rawData.message,
      POKEMONGO_MAP_FIELDS
    );
    if (_.size(parsedData) !== POKEMONGO_MAP_FIELDS.length) {
      res.status(400).json({error: 'Unknown data format.'});
      return;
    }

    let data = {
      _id: parsedData.pokemon_id + ':' + parsedData.disappear_time,
      spawnpoint_id: parsedData.spawnpoint_id,
      pokemon_id: parsedData.pokemon_id,
      geo: {
        type: 'Point',
        coordinates: [parsedData.longitude, parsedData.latitude]
      },
      disappear_time: parsedData.disappear_time
    }

    // Add parsedData to db here
    console.log(data);

    res.json({
      success: true
    });
  } else {
    res.status(400).json({error: 'Unknown data format.'});
  }
});

module.exports = router;
