const express = require('express');
const { getAllComments, getComment, createComment, updateComment, deleteComment, middlewareCommentId, findUserComments, findMoviesCommented } = require('./comments-controller');
let router = express.Router();


//Middlewares
router.get('/api/comments/:id', findUserComments);
router.get('/api/moviecomments/:id', findMoviesCommented);


//Routes
router.get('/api/comments/', getAllComments)
      .post('/api/comments/', createComment);
router.get('/api/comments/:id', middlewareCommentId , getComment)
      .put('/api/comments/:id', middlewareCommentId ,updateComment)
      .delete('/api/comments/:id',middlewareCommentId, deleteComment);

module.exports = router;