const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const reportsController = require('../Controllers/reportsController');

router.get('/', isLoggedIn, reportsController.index);

module.exports = router;