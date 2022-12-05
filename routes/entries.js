const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const entriesController = require('../Controllers/entriesController');

//get
router.get('/', isLoggedIn, entriesController.index);
router.get('/getMaterial', entriesController.getMaterial)

//Post
router.post('/registerEntrie', entriesController.registerEntrie);

module.exports = router;