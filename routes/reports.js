const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const reportsController = require('../Controllers/reportsController');

//Get
router.get('/', isLoggedIn, reportsController.index);

//post
router.post('/generateReport', reportsController.generateReport);

module.exports = router;