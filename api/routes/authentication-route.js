const express = require('express');
const router = express.Router();
const {checkEmail, signup, login} = require('../controllers/authentication-controller');

router.post('/api/authentication/signup' , checkEmail ,signup);
router.post('/api/authentication/login', login);

module.exports = router; 


