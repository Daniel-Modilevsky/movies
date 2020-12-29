const express = require('express');
const logger = require('../../lib/logs');
const router = express.Router();
const {checkEmail, signup, login, logout} = require('./authentication-controller');

router.post('/api/authentication/signup' , checkEmail ,signup);
router.post('/api/authentication/login', login);
router.post('/api/authentication/logout', logout);

module.exports = router; 


