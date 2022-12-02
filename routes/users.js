const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../Config/auth');
const usersController = require('../Controllers/usersController');
const helpers = require('../Config/helpers');
const multer = require('multer');
const upload = multer({storage:helpers.storeRuteUsers});//Upload profile photo

//get
router.get('/', isLoggedIn, usersController.index);
router.get('/myUserProfile', isLoggedIn, usersController.myProfile);
router.get('/editProfile', isLoggedIn, usersController.editProfile);
router.get('/createUser', isLoggedIn, usersController.createUser);
router.get('/changePassword', isLoggedIn, usersController.changePasswordView);
router.get('/getUser', usersController.getUser);

//post
router.post('/insertUser', usersController.insertUser);
router.post('/editUser', usersController.editUser);
router.post('/changePassword', usersController.changePassword);
router.post('/deleteUser', usersController.deleteUser)
router.post('/uploadPhoto',upload.single('file'), usersController.uploadPhoto);
router.post('/search', usersController.searchUser);
router.post('/searchFilter', usersController.searchUserFilter)

module.exports = router;
