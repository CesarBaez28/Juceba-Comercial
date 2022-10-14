const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const quoteController = require('../Controllers/quoteController');

router.get('/', isLoggedIn, quoteController.index);

module.exports = router;