const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Movie = require('../movies/movies-model');
const upload = require('../../lib/images');
const fs = require('fs');
const axios = require("axios").default;
const { query } = require('express');
const url = require('url');



const middlewareMovietId = async function(req, res, next){
    try{
        const movie = await Movie.findOne({ _id: req.params.id });
        if(!movie){
            message = 'Error - movie not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            logger.info(`Success - founded the movie`);
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find movie';
        logger.error(message);
        return res.status(401).json({message});
    }
};
const getAllmovies = async function(req, res){
    try{
        logger.info('getAllmovies');
        const movies = await Movie.find();
        logger.info(`founded ${movies.length} movies`);
        return res.status(200).json(movies);
    }
    catch(error){
        message = 'Error - Failed searching for all movies';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getMovie = async function(req, res){
    try{
        logger.info('getMovie');
        const movie = await Movie.findOne({ _id: req.params.id });
        logger.info(movie);
        return res.status(200).json({movie});
    }
    catch (error) {return res.status(400).json({error});}
};
const createMovie = async function(req, res){
    try{
        logger.info('createMovie');
        if(!req.body.name || !req.body.year || !req.body.runTime || !req.body.categories || !req.body.releaseDate ){
            logger.error('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params');
        }
        let newMovie = new Movie ({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            year: req.body.year,
            runTime:req.body.runTime,
            categories:req.body.categories,
            releaseDate:req.body.releaseDate,
            image: req.file.path.replace('\\','/')
        });
        if(req.body.director) newMovie.director = req.body.director;
        if(req.body.writer) newMovie.writer = req.body.writer;
        if(req.body.actors) newMovie.actors = req.body.actors;
        if(req.body.storyline) newMovie.storyline = req.body.storyline;
        if(req.body.rate) newMovie.rate = req.body.rate;

        const movie = await Movie.findById({_id:newMovie._id});
        if(!movie){
            newMovie.save();
            logger.info(`Success - Created New Movie ${newMovie}`);
            return res.status(200).json(newMovie);
        }
        else{
            message = 'Error - Movie already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new movie';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const updateMovie = async function(req, res){
    try{
        logger.info('updateMovie');
        const movie = await Movie.findById({ id: req.params.id });
        if(req.params.name) movie.name = req.params.name;
        if(req.params.year) movie.year = req.params.year;
        if(req.params.runTime) movie.runTime = req.params.runTime;
        if(req.params.categories) movie.categories = req.params.categories;
        if(req.params.releaseDate) movie.releaseDate = req.params.releaseDate;
        if(req.params.director) movie.director = req.params.director;
        if(req.params.writer) movie.writer = req.params.writer;
        if(req.params.actors) movie.actors = req.params.actors;
        if(req.params.storyline) movie.storyline = req.params.storyline;
        if(req.params.rate) movie.rate = req.params.rate;

        Movie.update({ id: movie.id });
        logger.info(movie);
        return res.status(200).json({movie});
    }
    catch (error) {return res.status(400).json({error});}
};
const deleteMovie = async function(req, res){
    try{
        logger.info('deleteMovie');
        const movie = await Movie.findById({ id: req.params.id });
        if (movie.isDeleted == false) movie.isDeleted = true;
        movie.update({ id: movie.id });
        logger.info(movie);
        return res.status(200).json({movie});
    }
    catch (error) {return res.status(400).json({error});}
};
const findUserMovies = async function(req, res){
    try{
        const movies = await User.find({_id: req.params.id})
                                 .populate({path: 'movie', model: 'Movie', select: 'moviesCollection'});
        logger.info(movies);
        return res.status(200).json({message});
    }
    catch{
        message = `Error - Faild Search  ${user.user_name} movies`;
        logger.error(`${message} : ${err}`);
        return res.status(400).json(message);
    }
};

const getByCategory = async function(req, res){
    try{
        logger.info('getByCategory');
        const movies = await Movie.find({ categories: {$regex: `${req.params.categoryName}`}}).limit(5).sort();
        logger.info(`founded ${movies.length} movies by ${req.params.categoryName} category`);
        return res.status(200).json(movies);
    }
    catch (error) {return res.status(400).json({error});}
}

const IMDB = async function(req, res) {
    let test;
    let name = req.query.name;
    console.log(name);
    let options = {
        method: 'GET',
        url: `${config.URL_ID}/${name}`,
        //url: `${config.URL_ID}/${name}`,
        headers: {
            'x-rapidapi-key': config.X_KEY,
            'x-rapidapi-host': config.X_HOST
        }
    };
  
    await axios.request(options).then(function(response) {
        const data = response.data;
        const id = data.titles[0].id;
        test = id;
        logger.warn(test);
    }).catch(function(error) {
        console.error(error);
    });
    logger.info(`${config.URL_FILM}/${test}`);
    let options2 = {
        method: 'GET',
        url: `${config.URL_FILM}/${test}`,
        headers: {
            'x-rapidapi-key': config.X_KEY,
            'x-rapidapi-host': config.X_HOST
        }
    };

    await axios.request(options2).then(function(response) {
        const data = response.data;
        console.log(data);
        return res.status(200).json({ data });
    }).catch(function(error) {
        console.error(error);
    });
}



module.exports =  { getAllmovies, getMovie, createMovie, updateMovie, deleteMovie, middlewareMovietId, findUserMovies, getByCategory ,IMDB};
