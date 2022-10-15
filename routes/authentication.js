const { Router } = require('express');
const express = require('express');
const router = express.Router();
const authenticationController = require("../Controllers/authenticationController");
const {isLoggedIn, isNotLoggedIn} = require('../Config/auth');

router.get('/login', isNotLoggedIn, authenticationController.login);
router.post('/login', authenticationController.authenticate);
router.get('/createAccount', authenticationController.createAccount);
router.post('/createAccount', authenticationController.signup);
router.get('/getMunicipios', authenticationController.getMunicipios);
router.get('/logout', authenticationController.logout);

module.exports = router;
