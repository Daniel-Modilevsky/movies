"use strict";

var express = require('express');

var _require = require('../controllers/movies-controller'),
    getAllmovies = _require.getAllmovies,
    getMovie = _require.getMovie,
    createMovie = _require.createMovie,
    updateMovie = _require.updateMovie,
    deleteMovie = _require.deleteMovie,
    checkMovietId = _require.checkMovietId,
    getByCategory = _require.getByCategory,
    IMDB = _require.IMDB,
    getSmartMovie = _require.getSmartMovie,
    getTopRated = _require.getTopRated;

var router = express.Router();

var upload = require('../../lib/images');

router.post('/api/movies/smart/', getSmartMovie);
router.get('/api/categories/:categoryName', getByCategory);
router.get('/api/toprated', getTopRated);
router.post('/api/movies/IMDB/', IMDB);
router.get('/api/movies/', getAllmovies).post('/api/movies/', upload.single('image'), createMovie);
router.get('/api/movies/:id', checkMovietId, getMovie).put('/api/movies/:id', checkMovietId, updateMovie)["delete"]('/api/movies/:id', checkMovietId, deleteMovie);
module.exports = router;