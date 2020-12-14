const express = require('express');
const { getAllComments, getComment, createComment, updateComment, deleteComment, middlewareCommentId, findUserComments, findMoviesCommented } = require('./comments-controller');
let router = express.Router();


//Middlewares
router.get('/api/comments/:id', findUserComments);
router.get('/api/comments/movies/:id', findMoviesCommented);
router.use('/api/comments/:id', middlewareCommentId);


//Routes
router.get('/api/comments/', getAllComments)
      .post('/api/comments/', createComment);
router.get('/api/comments/:id', getComment)
      .put('/api/comments/:id', updateComment)
      .delete('/api/comments/:id', deleteComment);

module.exports = router;