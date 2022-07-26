let express = require('express');
let router = express.Router();

const suppliersController = require('../Controllers/suppliersController');

router.get('/', suppliersController.index);
router.get('/createSupplier', suppliersController.createSupplier);
router.get('/editSupplier', suppliersController.editSupplier);

module.exports = router;