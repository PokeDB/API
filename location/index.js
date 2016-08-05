'use strict';

var express = require('express');
var router = express.Router();

router.use('/add-pokemon', require('./addPokemon'));

module.exports = router;
