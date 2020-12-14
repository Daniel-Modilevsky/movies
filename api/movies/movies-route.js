const express = require('express');
const { getAllmovies, getMovie, createMovie, updateMovie, deleteMovie, middlewareMovietId, findUserMovies } = require('./movies-controller');
let router = express.Router();


//Middlewares
router.get('/api/movies/:id', findUserMovies);
router.use('/api/movies/:id', middlewareMovietId);


//Routes
router.get('/api/movies/', getAllmovies)
      .post('/api/movies/', createMovie);
router.get('/api/movies/:id', getMovie)
      .put('/api/movies/:id', updateMovie)
      .delete('/api/movies/:id', deleteMovie);

module.exports = router;