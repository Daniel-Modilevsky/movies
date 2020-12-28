const express = require('express');
const { getAllmovies, getMovie, createMovie, updateMovie, deleteMovie, middlewareMovietId, findUserMovies, getByCategory ,IMDB} = require('./movies-controller');
let router = express.Router();
const upload = require('../../lib/images');


//router.get('/api/movies/:id', findUserMovies);

router.get('/api/categories/:categoryName', getByCategory); 
router.get('/api/movies/IMDB/', IMDB);

//Routes
router.get('/api/movies/', getAllmovies)
      .post('/api/movies/', upload.single('image') ,createMovie);
router.get('/api/movies/:id', middlewareMovietId, getMovie)
      .put('/api/movies/:id', middlewareMovietId, updateMovie)
      .delete('/api/movies/:id',middlewareMovietId, deleteMovie);


// router get by category

module.exports = router;