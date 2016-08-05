var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spawnPointSchema = new Schema({
  _id: String,
  disappearTime: Date,
  loc: {type: String, coordinates: [Number]},
  pokemonId: Number,
  spawnPointId:  String
}, {collection: 'spawnPoints', typeKey: '$type'});

spawnPointSchema.index({loc: '2dsphere', pokemonId: 1});
spawnPointSchema.index({disappearTime: 1}, {expireAfterSeconds: 432000});

var SpawnPoint = mongoose.model('spawnPoints', spawnPointSchema);

module.exports = SpawnPoint;
