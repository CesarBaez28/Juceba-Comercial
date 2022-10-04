let express = require('express');
let router = express.Router();

const usersController = require('../Controllers/usersController');

router.get('/', usersController.index);
router.get('/myUserProfile', usersController.myProfile);
router.get('/editProfile', usersController.editProfile);
router.get('/createUser', usersController.createUser);
router.get('/changePassword', usersController.changePassword);

module.exports = router;
