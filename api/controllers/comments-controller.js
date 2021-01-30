const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const Comment = require('../models/comments-model');
const User = require('../models/users-model');

let message = '';

const checkCommentId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const comment = await Comment.findOne({_id: id});
        if(!comment){
            message = 'Error - Comment not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
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
        const comment = await Comment.findById({ _id: req.params.id });
        return res.status(200).json({comment});
    }
    catch (error) {return res.status(400).json({error});}
};
const createComment = async function(req, res){
    try{
        if(!req.body.description || !req.body.creationBy || !req.body.commentOn ||  !req.body.creationByName ){
            logger.error('Error - Missing Params - can not complete valid creation without (description & creationBy & commentOn & creationByName) params');
            return res.status(400).send('Error - Missing Params - can not complete valid creation without (description & creationBy & commentOn & creationByName) params');
        }
        let newComment = new Comment({ _id: mongoose.Types.ObjectId(), description: req.body.description, creationBy: req.body.creationBy, commentOn:req.body.commentOn, creationByName:req.body.creationByName  });
        const comment = await Comment.findOne({_id : newComment._id});
        if(!comment){
            newComment.save();
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
        const comment = await Comment.findOne({_id: req.params.id});
        if (req.body.description) comment.description = req.body.description;
        comment.creationDate = Date.now();
        Comment.update({ _id: comment._id });
        return res.status(200).json({comment});
    }
    catch (error) {return res.status(400).json({error});}
};
const approveComment = async function(req, res){
    try{
        const comment = await Comment.findOne({_id: req.params.id});
        if (comment.isPublic == false) comment.isPublic = true;
        comment.creationDate = Date.now();
        comment.update({ _id: comment._id });
        logger.info(comment);
        comment.save();
        return res.status(200).json({comment});
    }
    catch (error) {return res.status(400).json({error});}
};
const deleteComment = async function(req, res){
    try{
        const comment = await Comment.findById({ _id: req.params.id });
        comment.delete({ _id: comment._id });
        return res.status(200).json({msg: `The Comment ${req.params.id} - deleted`});
    }
    catch (error) {return res.status(400).json({error});}
};
const findUserComments = async function(req, res){
    try{
        const comments = await User.find({_id: req.params.id})
                                 .populate({path: 'comment', model: 'Comment', select: 'createdBy'});
        logger.info(`founded ${comments.length} comments`);
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
        const comments = await Comment.find({commentOn:req.params.id, isPublic:true});
        logger.info(`founded ${comments.length} comments of the movie`);
        return res.status(200).json({comments});
    }
    catch(error){
        message = `Error - Faild Search comments of movie`;
            logger.error(`${message} : ${error}`);
            return res.status(400).json(message);
    }
};
const findAdminCommented = async function(req,res){
    try{
        const comments = await Comment.find({isPublic:false});
        logger.info(`founded ${comments.length} comments of the movie`);
        return res.status(200).json({comments});
    }
    catch(error){
        message = `Error - Faild Search comments for admin`;
            logger.error(`${message} : ${error}`);
            return res.status(400).json(message);
    }
};

module.exports =  { getAllComments, getComment, createComment, updateComment, deleteComment, checkCommentId, findUserComments, findMoviesCommented, findAdminCommented, approveComment };
