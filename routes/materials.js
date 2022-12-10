const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const { checkRole } = require('../Config/roleAuth');
const materialsController = require('../Controllers/materialsController');
const helpers = require('../Config/helpers');
const multer = require('multer');
const upload = multer({storage:helpers.storeRuteMaterials});//Upload material photo

//Get
router.get('/', isLoggedIn, checkRole, materialsController.index);
router.get('/createMaterial', isLoggedIn, checkRole, materialsController.createMaterial);
router.get('/editMaterial', isLoggedIn, checkRole, materialsController.editMaterial);

//post
router.post('/insertMaterial', upload.single('file'), materialsController.insertMaterial);
router.post('/updateMaterial', upload.single('file'), materialsController.updateMaterial);
router.post('/deleteMaterial', materialsController.deleteMaterial);
router.post('/search', materialsController.searchMaterials)
router.post('/searchFilter', materialsController.searchMaterialsFilter)

module.exports = router;