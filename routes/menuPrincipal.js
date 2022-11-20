const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');

const menuPrincipalController = require('../Controllers/menuPrincipalController');

router.get('/', isLoggedIn, menuPrincipalController.showMainMenu);

module.exports = router;

