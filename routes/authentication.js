var express = require('express');
var router = express.Router();

const authenticationController = require("../Controllers/authenticationController");

router.get('/login', authenticationController.login);
router.post('/login', authenticationController.authenticate);

module.exports = router;
