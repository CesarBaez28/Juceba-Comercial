const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const { checkRole } = require('../Config/roleAuth');
const productsController = require('../Controllers/productsController');
const helpers = require('../Config/helpers');
const multer = require('multer');
const upload = multer({storage:helpers.storeRuteProducts});//Upload product photo


//Get
router.get('/', isLoggedIn, checkRole, productsController.index);
router.get('/createProduct', isLoggedIn, checkRole, productsController.createProduct);
router.get('/editProduct', isLoggedIn, checkRole, productsController.editProduct);

//post
router.post('/insertProduct', upload.single('file'), productsController.insertProduct)
router.post('/updateProduct', upload.single('file'), productsController.updateProduct);
router.post('/search', productsController.searchProducts);
router.post('/searchFilter', productsController.searchProductFilter);

module.exports = router;