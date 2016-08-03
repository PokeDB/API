var express = require('express');
var app = express();

// routes
var pokemon = require('./pokemon');

app.get('/', function(req, res) {
  res.json({
    name: 'PokeDB API',
    status: 'up'
  });
});

app.use('/pokemon', pokemon);

app.listen(80, function () {
  console.log('app listening on port 80!');
});

