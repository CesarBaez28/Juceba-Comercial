var express = require('express');
var router = express.Router();

const menuPrincipalController = require('../Controllers/menuPrincipalController');

router.get('/', menuPrincipalController.showMainMenu);

module.exports = router;

