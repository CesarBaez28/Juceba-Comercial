const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const quoteController = require('../Controllers/quoteController');

//Get
router.get('/', isLoggedIn, quoteController.index);

//Post
router.post('/registerQuote', quoteController.registerQuote);

module.exports = router;