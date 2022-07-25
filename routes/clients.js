let express = require('express');
let router = express.Router();

const clientsController = require('../Controllers/clientsController');

router.get('/', clientsController.index);
router.get('/createClient', clientsController.createClient);
router.get('/editClient', clientsController.editClient);

module.exports = router;