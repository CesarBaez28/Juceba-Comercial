var express = require('express');
var router = express.Router();

const entriesController = require('../Controllers/entriesController');

router.get('/', entriesController.index);

module.exports = router;