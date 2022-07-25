var express = require('express');
var router = express.Router();

const authenticationController = require("../Controllers/authenticationController");

router.get('/login', authenticationController.login);

module.exports = router;
