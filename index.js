var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// routes
var pokemon = require('./pokemon');

// Parse incoming application/json
app.use(bodyParser.json());

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
