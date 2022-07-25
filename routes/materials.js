var express = require('express');
var router = express.Router();

const materialsRouter = require('../Controllers/materialsController');

router.get('/', materialsRouter.index);

module.exports = router;