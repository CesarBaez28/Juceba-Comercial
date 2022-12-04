const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');

const productsController = require('../Controllers/productsController');

//Get
router.get('/', isLoggedIn, productsController.index);
router.get('/createProduct', isLoggedIn, productsController.createProduct);
router.get('/editProduct', isLoggedIn, productsController.editProduct);

//post
router.post('/insertProduct', productsController.insertProduct)

module.exports = router;