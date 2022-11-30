const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../Config/auth');
const usersController = require('../Controllers/usersController');
const multer = require('multer');
let fecha = Date.now();

//Guardar archivos(fotos...)
const storeRute = multer.diskStorage({
  destination: function (request, file, callback) {
    return callback(null, './public/images/users/')
  },

  filename:function(request, file, callback){
    console.log(file);
    return callback(null,fecha+"_"+file.originalname);
  }
});
const upload = multer({storage:storeRute});

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
