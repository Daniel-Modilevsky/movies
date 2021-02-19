const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const Popular = require('../models/populars-model');

const checkPopulartId = async function(req, res, next){
    try{
        const movie = await Popular.findOne({ _id: req.params.id });
        if(!movie){
            message = 'Error - movie not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find movie';
        logger.error(message);
        return res.status(401).json({message});
    }
};
const getAllpopulars = async function(req, res){
    try{
        const movies = await Popular.find();
        return res.status(200).json(movies);
    }
    catch(error){
        message = 'Error - Failed searching for all movies';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getPopular = async function(req, res){
    try{
        const movie = await Popular.findOne({ _id: req.params.id });
        return res.status(200).json({movie});
    }
    catch (error) {return res.status(400).json({error});}
};
const createPopular = async function(req, res){
    try{
        if(!req.body.name  || !req.body.runTime || !req.body.categories || !req.body.releaseDate ){
            logger.error('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params');
        }
        let newMovie = new Popular ({
            _id: parseInt(req.body._id),
            name: req.body.name,
            runTime:req.body.runTime,
            categories:req.body.categories,
            releaseDate:req.body.releaseDate,
            image: req.file.path.replace('\\','/')
        });
        if(req.body.actors) newMovie.actors = req.body.actors;
        if(req.body.storyline) newMovie.storyline = req.body.storyline;
        const movie = await Popular.findById({_id:newMovie._id});
        if(!movie){
            newMovie.save();
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
const updatePopular = async function(req, res){
    try{
        const movie = await Popular.findById({ _id: req.params.id });
        if(req.params.name) movie.name = req.params.name;
        if(req.params.runTime) movie.runTime = req.params.runTime;
        if(req.params.categories) movie.categories = req.params.categories;
        if(req.params.releaseDate) movie.releaseDate = req.params.releaseDate;
        if(req.params.actors) movie.actors = req.params.actors;
        if(req.params.storyline) movie.storyline = req.params.storyline;
        Movie.update({ _id: movie._id });
        return res.status(200).json({movie});
    }
    catch (error) {return res.status(400).json({error});}
};
const deletePopular = async function(req, res){
    try{
        const movie = await Popular.findById({ _id: req.params.id });
        if (movie.isDeleted == false) movie.isDeleted = true;
        movie.update({ _id: movie._id });
        return res.status(200).json({movie});
    }
    catch (error) {return res.status(400).json({error});}
};

module.exports =  { getAllpopulars, getPopular, createPopular, updatePopular, deletePopular, checkPopulartId};
