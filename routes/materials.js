var express = require('express');
var router = express.Router();

const materialsRouter = require('../Controllers/materialsController');

router.get('/', materialsRouter.index);
router.get('/createMaterial', materialsRouter.createMaterial);

module.exports = router;