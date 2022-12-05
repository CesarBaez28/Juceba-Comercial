const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const salesController = require('../Controllers/salesController');

router.get('/', isLoggedIn, salesController.index);
router.get('/getProduct', salesController.getProduct);

module.exports = router;