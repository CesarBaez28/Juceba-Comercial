const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const { checkRole } = require('../Config/roleAuth');
const clientsController = require('../Controllers/clientsController');

//Get
router.get('/', isLoggedIn, checkRole, clientsController.index);
router.get('/createClient', checkRole, isLoggedIn, clientsController.createClient);
router.get('/editClient', checkRole, isLoggedIn, clientsController.editClient);
router.get('/getClients', clientsController.getClients);

//Post
router.post('/insertClient', clientsController.insertClient);
router.post('/updateClient', clientsController.updateClient);
router.post('/deleteClient', clientsController.deleteClient);
router.post('/search', clientsController.searchClients);
router.post('/searchFilter', clientsController.searchClientsFilter)

module.exports = router;