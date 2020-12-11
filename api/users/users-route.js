const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, middlewareUserName, middlewareDefault } = require('./users-controller');
let router = express.Router();

//Middlewares
router.use(middlewareDefault);
router.use('/api/users/:id', middlewareId);

//Routes
router.get('/api/users/', getAllUsers);
router.get('/api/users/:id', getUser)
      .put('/api/users/:id', updateUser)
      .delete('/api/users/:id', deleteUser);

module.exports = router;