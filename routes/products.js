var express = require('express');
var router = express.Router();

const productsController = require('../Controllers/productsController');

router.get('/', productsController.index);

module.exports = router;