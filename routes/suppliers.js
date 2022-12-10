const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const { checkRole } = require('../Config/roleAuth');
const suppliersController = require('../Controllers/suppliersController');

//Get
router.get('/', isLoggedIn, checkRole, suppliersController.index);
router.get('/createSupplier', isLoggedIn, checkRole, suppliersController.createSupplier);
router.get('/editSupplier', isLoggedIn, checkRole, suppliersController.editSupplier);
router.get('/getSupplier', suppliersController.getSupplier);

//Post
router.post('/insertSupplier', suppliersController.insertSupplier);
router.post('/updateSupplier', suppliersController.updateSupplier);
router.post('/deleteSupplier', suppliersController.deleteSupplier)
router.post('/search', suppliersController.searchSuppliers);
router.post('/searchFilter', suppliersController.searchSuppliersFilter)

module.exports = router;