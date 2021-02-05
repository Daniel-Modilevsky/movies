"use strict";

var mongoose = require('mongoose');

var logger = require('../../lib/logs');

var Comment = require('../models/comments-model');

var User = require('../models/users-model');

var message = '';

var checkCommentId = function checkCommentId(req, res, next) {
  var id, comment;
  return regeneratorRuntime.async(function checkCommentId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.params.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(Comment.findOne({
            _id: id
          }));

        case 4:
          comment = _context.sent;

          if (comment) {
            _context.next = 11;
            break;
          }

          message = 'Error - Comment not exist';
          logger.error(message);
          return _context.abrupt("return", res.status(401).json({
            message: message
          }));

        case 11:
          next();

        case 12:
          _context.next = 19;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          message = 'Error - Problem find Comment';
          logger.error(message);
          return _context.abrupt("return", res.status(401).json({
            message: message
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var getAllComments = function getAllComments(req, res) {
  var comments;
  return regeneratorRuntime.async(function getAllComments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Comment.find());

        case 3:
          comments = _context2.sent;
          logger.info("founded ".concat(comments.length, " Comments"));
          return _context2.abrupt("return", res.status(200).json(comments));

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          message = 'Error - Failed searching for all comments';
          logger.error("".concat(message, " + ").concat(_context2.t0));
          return _context2.abrupt("return", res.status(400).json({
            message: message
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getComment = function getComment(req, res) {
  var comment;
  return regeneratorRuntime.async(function getComment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Comment.findById({
            _id: req.params.id
          }));

        case 3:
          comment = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            comment: comment
          }));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(400).json({
            error: _context3.t0
          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var createComment = function createComment(req, res) {
  var newComment, comment;
  return regeneratorRuntime.async(function createComment$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!(!req.body.description || !req.body.creationBy || !req.body.commentOn || !req.body.creationByName)) {
            _context4.next = 4;
            break;
          }

          logger.error('Error - Missing Params - can not complete valid creation without (description & creationBy & commentOn & creationByName) params');
          return _context4.abrupt("return", res.status(400).send('Error - Missing Params - can not complete valid creation without (description & creationBy & commentOn & creationByName) params'));

        case 4:
          newComment = new Comment({
            _id: mongoose.Types.ObjectId(),
            description: req.body.description,
            creationBy: req.body.creationBy,
            commentOn: req.body.commentOn,
            creationByName: req.body.creationByName
          });
          _context4.next = 7;
          return regeneratorRuntime.awrap(Comment.findOne({
            _id: newComment._id
          }));

        case 7:
          comment = _context4.sent;

          if (comment) {
            _context4.next = 13;
            break;
          }

          newComment.save();
          return _context4.abrupt("return", res.status(200).json(newComment));

        case 13:
          message = 'Error - Comment already exist';
          logger.error(message);
          return _context4.abrupt("return", res.status(400).json(message));

        case 16:
          _context4.next = 23;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          message = 'Error - Faild Create new Comment';
          logger.error("".concat(message, " : ").concat(_context4.t0));
          return _context4.abrupt("return", res.status(400).json(message));

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var updateComment = function updateComment(req, res) {
  var comment;
  return regeneratorRuntime.async(function updateComment$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Comment.findOne({
            _id: req.params.id
          }));

        case 3:
          comment = _context5.sent;
          if (req.body.description) comment.description = req.body.description;
          comment.creationDate = Date.now();
          Comment.update({
            _id: comment._id
          });
          return _context5.abrupt("return", res.status(200).json({
            comment: comment
          }));

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(400).json({
            error: _context5.t0
          }));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var approveComment = function approveComment(req, res) {
  var comment;
  return regeneratorRuntime.async(function approveComment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Comment.findOne({
            _id: req.params.id
          }));

        case 3:
          comment = _context6.sent;
          if (comment.isPublic == false) comment.isPublic = true;
          comment.creationDate = Date.now();
          comment.update({
            _id: comment._id
          });
          logger.info(comment);
          comment.save();
          return _context6.abrupt("return", res.status(200).json({
            comment: comment
          }));

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(400).json({
            error: _context6.t0
          }));

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var deleteComment = function deleteComment(req, res) {
  var comment;
  return regeneratorRuntime.async(function deleteComment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Comment.findById({
            _id: req.params.id
          }));

        case 3:
          comment = _context7.sent;
          comment["delete"]({
            _id: comment._id
          });
          return _context7.abrupt("return", res.status(200).json({
            msg: "The Comment ".concat(req.params.id, " - deleted")
          }));

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(400).json({
            error: _context7.t0
          }));

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var findUserComments = function findUserComments(req, res) {
  var comments;
  return regeneratorRuntime.async(function findUserComments$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.find({
            _id: req.params.id
          }).populate({
            path: 'comment',
            model: 'Comment',
            select: 'createdBy'
          }));

        case 3:
          comments = _context8.sent;
          logger.info("founded ".concat(comments.length, " comments"));
          return _context8.abrupt("return", res.status(200).json({
            comments: comments
          }));

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          message = "Error - Faild Search  ".concat(user.user_name, " comments");
          logger.error("".concat(message, " : ").concat(_context8.t0));
          return _context8.abrupt("return", res.status(400).json(message));

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var findMoviesCommented = function findMoviesCommented(req, res) {
  var comments;
  return regeneratorRuntime.async(function findMoviesCommented$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            commentOn: req.params.id,
            isPublic: true
          }));

        case 3:
          comments = _context9.sent;
          logger.info("founded ".concat(comments.length, " comments of the movie"));
          return _context9.abrupt("return", res.status(200).json({
            comments: comments
          }));

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          message = "Error - Faild Search comments of movie";
          logger.error("".concat(message, " : ").concat(_context9.t0));
          return _context9.abrupt("return", res.status(400).json(message));

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var findAdminCommented = function findAdminCommented(req, res) {
  var comments;
  return regeneratorRuntime.async(function findAdminCommented$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            isPublic: false
          }));

        case 3:
          comments = _context10.sent;
          logger.info("founded ".concat(comments.length, " comments of the movie"));
          return _context10.abrupt("return", res.status(200).json({
            comments: comments
          }));

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          message = "Error - Faild Search comments for admin";
          logger.error("".concat(message, " : ").concat(_context10.t0));
          return _context10.abrupt("return", res.status(400).json(message));

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var findUserCommented = function findUserCommented(req, res) {
  var comments;
  return regeneratorRuntime.async(function findUserCommented$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            creationBy: req.params.id,
            isPublic: true
          }));

        case 3:
          comments = _context11.sent;
          logger.info("founded ".concat(comments.length, " comments of User"));
          return _context11.abrupt("return", res.status(200).json({
            comments: comments
          }));

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          message = "Error - Faild Search comments of User";
          logger.error("".concat(message, " : ").concat(_context11.t0));
          return _context11.abrupt("return", res.status(400).json(message));

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  getAllComments: getAllComments,
  getComment: getComment,
  createComment: createComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  checkCommentId: checkCommentId,
  findUserComments: findUserComments,
  findMoviesCommented: findMoviesCommented,
  findAdminCommented: findAdminCommented,
  approveComment: approveComment,
  findUserCommented: findUserCommented
};