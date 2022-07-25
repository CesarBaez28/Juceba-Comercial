var express = require('express');
var router = express.Router();

const suppliersController = require('../Controllers/suppliersController');

router.get('/', suppliersController.index);

module.exports = router;