const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../Config/auth');
const materialsRouter = require('../Controllers/materialsController');

router.get('/', isLoggedIn, materialsRouter.index);
router.get('/createMaterial', isLoggedIn, materialsRouter.createMaterial);
router.get('/editMaterial', isLoggedIn, materialsRouter.editMaterial);

module.exports = router;