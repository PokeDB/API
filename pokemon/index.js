var express = require('express');
var router = express.Router();

// endpoints for pokemon
var add = require('./add');

router.use('/add', add);

module.exports = router;
