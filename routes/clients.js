const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const clientsController = require('../Controllers/clientsController');

router.get('/', isLoggedIn, clientsController.index);
router.get('/createClient', isLoggedIn, clientsController.createClient);
router.get('/editClient', isLoggedIn, clientsController.editClient);

module.exports = router;