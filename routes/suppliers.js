const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const suppliersController = require('../Controllers/suppliersController');

//Get
router.get('/', isLoggedIn, suppliersController.index);
router.get('/createSupplier', isLoggedIn, suppliersController.createSupplier);
router.get('/editSupplier', isLoggedIn, suppliersController.editSupplier);

//Post
router.post('/insertSupplier', suppliersController.insertSupplier);

module.exports = router;