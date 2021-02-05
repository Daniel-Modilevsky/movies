"use strict";

var express = require('express');

var _require = require('../controllers/comments-controller'),
    getAllComments = _require.getAllComments,
    getComment = _require.getComment,
    createComment = _require.createComment,
    updateComment = _require.updateComment,
    deleteComment = _require.deleteComment,
    checkCommentId = _require.checkCommentId,
    findMoviesCommented = _require.findMoviesCommented,
    findAdminCommented = _require.findAdminCommented,
    approveComment = _require.approveComment,
    findUserCommented = _require.findUserCommented;

var router = express.Router();
router.get('/api/moviecomments/:id', findMoviesCommented);
router.get('/api/admincomments/', findAdminCommented);
router.get('/api/usercomments/:id', findUserCommented);
router.get('/api/comments/', getAllComments).post('/api/comments/', createComment);
router.get('/api/comments/:id', checkCommentId, getComment).put('/api/comments/:id', checkCommentId, updateComment)["delete"]('/api/comments/:id', checkCommentId, deleteComment);
router.put('/api/approvecomments/:id', checkCommentId, approveComment);
module.exports = router;