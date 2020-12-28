const express = require('express');
const { getAllpopulars, getPopular, createPopular, updatePopular, deletePopular, checkPopulartId} = require('./populars-controller');
let router = express.Router();
const upload = require('../../lib/images');




//Routes
router.get('/api/populars/', getAllpopulars)
      .post('/api/populars/', upload.single('image') ,createPopular);
router.get('/api/populars/:id', checkPopulartId, getPopular)
      .put('/api/populars/:id', checkPopulartId, updatePopular)
      .delete('/api/populars/:id',checkPopulartId, deletePopular);


// router get by category

module.exports = router;