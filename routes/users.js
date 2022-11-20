const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const usersController = require('../Controllers/usersController');

router.get('/', isLoggedIn, usersController.index);
router.get('/myUserProfile', isLoggedIn, usersController.myProfile);
router.get('/editProfile', isLoggedIn, usersController.editProfile);
router.get('/createUser', isLoggedIn, usersController.createUser);
router.get('/changePassword', isLoggedIn, usersController.changePassword);
router.get('/getUser', usersController.getUser);
router.post('/insertUser', usersController.insertUser);

module.exports = router;
