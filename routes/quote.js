var express = require('express');
var router = express.Router();

const quoteController = require('../Controllers/quoteController');

router.get('/', quoteController.index);

module.exports = router;