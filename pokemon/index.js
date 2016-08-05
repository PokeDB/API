'use strict';

var express = require('express');
var router = express.Router();

// endpoints for pokemon
var add = require('./add');
var fetch = require('./fetch');

router.use('/add', add);
router.use('/fetch', fetch)

module.exports = router;
