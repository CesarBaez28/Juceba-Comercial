const { Router } = require('express');
var express = require('express');
var router = express.Router();

const authenticationController = require("../Controllers/authenticationController");

router.get('/login', authenticationController.login);
router.post('/login', authenticationController.authenticate);
router.get('/createAccount', authenticationController.createAccount);
router.post('/createAccount', authenticationController.signup);
router.get('/getMunicipios', authenticationController.getMunicipios);

module.exports = router;
