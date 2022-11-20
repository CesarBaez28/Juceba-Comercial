const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const suppliersController = require('../Controllers/suppliersController');

router.get('/', isLoggedIn, suppliersController.index);
router.get('/createSupplier', isLoggedIn, suppliersController.createSupplier);
router.get('/editSupplier', isLoggedIn, suppliersController.editSupplier);

module.exports = router;