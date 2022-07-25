var express = require('express');
var router = express.Router();

const reportsController = require('../Controllers/reportsController');

router.get('/', reportsController.index);

module.exports = router;