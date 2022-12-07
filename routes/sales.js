const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const salesController = require('../Controllers/salesController');

//Get
router.get('/', isLoggedIn, salesController.index);
router.get('/getProduct', salesController.getProduct);

//Post
router.post('/registerSale', salesController.registerSale);

module.exports = router;