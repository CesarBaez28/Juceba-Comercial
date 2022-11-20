const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const entriesController = require('../Controllers/entriesController');

router.get('/', isLoggedIn, entriesController.index);

module.exports = router;