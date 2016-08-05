var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spawnPointSchema = new Schema({
  _id: String,
  disappearTime: Date,
  loc: {type: String, coordinates: [Number]},
  pokemonId: Number,
  spawnPointId:  String
}, {collection: 'spawnPoints', typeKey: '$type'});

spawnPointSchema.index({loc: '2dsphere'});

var SpawnPoint = mongoose.model('spawnPoints', spawnPointSchema);

module.exports = SpawnPoint;

