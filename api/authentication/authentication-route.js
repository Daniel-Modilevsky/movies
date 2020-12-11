const express = require('express');
const router = express.Router();
const {middlewareEmail, signup, login, logout} = require('./authentication-controller');

router.use('/signup/', middlewareEmail);
router.use('/login/', middlewareEmail);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);


module.exports = router; 


