var express = require('express');
var router = express.Router();

const salesController = require('../Controllers/salesController');

router.get('/', salesController.index);

module.exports = router;