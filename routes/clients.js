const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const clientsController = require('../Controllers/clientsController');

//Get
router.get('/', isLoggedIn, clientsController.index);
router.get('/createClient', isLoggedIn, clientsController.createClient);
router.get('/editClient', isLoggedIn, clientsController.editClient);
router.get('/getClients', clientsController.getClients);

//Post
router.post('/insertClient', clientsController.insertClient);
router.post('/updateClient', clientsController.updateClient);
router.post('/deleteClient', clientsController.deleteClient);
router.post('/search', clientsController.searchClients);
router.post('/searchFilter', clientsController.searchClientsFilter)

module.exports = router;