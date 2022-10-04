let express = require('express');
let router = express.Router();

const menuPrincipalController = require('../Controllers/menuPrincipalController');

router.get('/', menuPrincipalController.showMainMenu);

module.exports = router;

