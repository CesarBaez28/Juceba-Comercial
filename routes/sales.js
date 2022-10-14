const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const salesController = require('../Controllers/salesController');

router.get('/', isLoggedIn, salesController.index);

module.exports = router;