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

var port = process.env.NODE_ENV === 'production' ? 80 : 8080;

app.listen(port, function () {
  console.log(process.env.NODE_ENV + ' app listening on port '+port+'!');
});

