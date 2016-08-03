var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Parse incoming application/json
app.use(bodyParser.json());

// routes
var pokemon = require('./pokemon');

app.get('/', function(req, res) {
  res.json({
    name: 'PokeDB API',
    status: 'up'
  });
});

app.use('/pokemon', pokemon);

var port = process.env.NODE_ENV === 'production' ? 80 : 8080;

app.listen(port, function() {
  console.log(process.env.NODE_ENV + ' app listening on port ' + port + '!');
});
