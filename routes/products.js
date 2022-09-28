var express = require('express');
var router = express.Router();

const productsController = require('../Controllers/productsController');

router.get('/', productsController.index);
router.get('/createProduct', productsController.createProduct);
router.get('/editProduct', productsController.editProduct);

module.exports = router;