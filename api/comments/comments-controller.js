const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Comment = require('./comments-model');
const User = require('../users/users-model');
const Movie = require('../movies/movies-model');

let message = '';

const checkCommentId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const comment = await Comment.findById({id});
        if(!comment){
            message = 'Error - Comment not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            logger.info(`Success - founded the Comment`);
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find Comment';
        logger.error(message);
        return res.status(401).json({message});
    }
};
const getAllComments = async function(req, res){
    try{
        logger.info('getAllComments');
        const comments = await Comment.find();
        logger.info(`founded ${comments.length} Comments`);
        return res.status(200).json(comments);
    }
    catch(error){
        message = 'Error - Failed searching for all comments';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getComment = async function(req, res){
    try{
        logger.info('getComment');
        const comment = await Comment.findById({ id: req.params.id });
        logger.info(comment);
        return res.status(200).json({comment});
    }
    catch (error) {return res.status(400).json({error});}
};
const createComment = async function(req, res){
    try{
        logger.info('createComment');
        if(!req.body.description || !req.body.creationBy || !req.body.commentOn ||  !req.body.creationByName ){
            logger.error('Error - Missing Params - can not complete valid creation without (description & creationBy & commentOn & creationByName) params');
            return res.status(400).send('Error - Missing Params - can not complete valid creation without (description & creationBy & commentOn & creationByName) params');
        }
        let newComment = new Comment({ _id: mongoose.Types.ObjectId(), description: req.body.description, creationBy: req.body.creationBy, commentOn:req.body.commentOn, creationByName:req.body.creationByName  });
        const comment = await Comment.findOne({_id : newComment._id});
        if(!comment){
            newComment.save();
            logger.info(`Success - Created New Comment ${newComment}`);
            return res.status(200).json(newComment);
        }
        else{
            message = 'Error - Comment already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new Comment';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const updateComment = async function(req, res){
    try{
        logger.info('updateComment');
        const comment = await Comment.findById({ id: req.params.id });
        if (req.body.description) comment.description = req.body.description;
        comment.creationDate = Date.now();
        Comment.update({ id: comment.id });
        logger.info(comment);
        return res.status(200).json({comment});
    }
    catch (error) {return res.status(400).json({error});}
};
const deleteComment = async function(req, res){
    try{
        logger.info('deleteComment');
        const comment = await Comment.findById({ id: req.params.id });
        if (comment.isDeleted == false) comment.isDeleted = true;
        comment.update({ id: comment.id });
        logger.info(comment);
        return res.status(200).json({comment});
    }
    catch (error) {return res.status(400).json({error});}
};
const findUserComments = async function(req, res){
    try{
        const comments = await User.find({_id: req.params.id})
                                 .populate({path: 'comment', model: 'Comment', select: 'createdBy'});
        logger.info(comments);
        return res.status(200).json({comments});
    }
    catch(error){
        message = `Error - Faild Search  ${user.user_name} comments`;
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const findMoviesCommented = async function(req,res){
    try{
        const comments = await Comment.find({commentOn:req.params.id});
        logger.info(`founded ${comments.length} comments of the movie`);
        return res.status(200).json({comments});
    }
    catch(error){
        message = `Error - Faild Search comments of movie`;
            logger.error(`${message} : ${error}`);
            return res.status(400).json(message);
    }
};

module.exports =  { getAllComments, getComment, createComment, updateComment, deleteComment, checkCommentId, findUserComments, findMoviesCommented };
