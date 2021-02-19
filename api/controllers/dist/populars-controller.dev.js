"use strict";

var mongoose = require('mongoose');

var logger = require('../../lib/logs');

var Popular = require('../models/populars-model');

var checkPopulartId = function checkPopulartId(req, res, next) {
  var movie;
  return regeneratorRuntime.async(function checkPopulartId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Popular.findOne({
            _id: req.params.id
          }));

        case 3:
          movie = _context.sent;

          if (movie) {
            _context.next = 10;
            break;
          }

          message = 'Error - movie not exist';
          logger.error(message);
          return _context.abrupt("return", res.status(401).json({
            message: message
          }));

        case 10:
          next();

        case 11:
          _context.next = 18;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          message = 'Error - Problem find movie';
          logger.error(message);
          return _context.abrupt("return", res.status(401).json({
            message: message
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var getAllpopulars = function getAllpopulars(req, res) {
  var movies;
  return regeneratorRuntime.async(function getAllpopulars$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Popular.find());

        case 3:
          movies = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(movies));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          message = 'Error - Failed searching for all movies';
          logger.error("".concat(message, " + ").concat(_context2.t0));
          return _context2.abrupt("return", res.status(400).json({
            message: message
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getPopular = function getPopular(req, res) {
  var movie;
  return regeneratorRuntime.async(function getPopular$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Popular.findOne({
            _id: req.params.id
          }));

        case 3:
          movie = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            movie: movie
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

var createPopular = function createPopular(req, res) {
  var newMovie, movie;
  return regeneratorRuntime.async(function createPopular$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!(!req.body.name || !req.body.runTime || !req.body.categories || !req.body.releaseDate)) {
            _context4.next = 4;
            break;
          }

          logger.error('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params');
          return _context4.abrupt("return", res.status(400).send('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params'));

        case 4:
          newMovie = new Popular({
            _id: parseInt(req.body._id),
            name: req.body.name,
            runTime: req.body.runTime,
            categories: req.body.categories,
            releaseDate: req.body.releaseDate,
            image: req.file.path.replace('\\', '/')
          });
          if (req.body.actors) newMovie.actors = req.body.actors;
          if (req.body.storyline) newMovie.storyline = req.body.storyline;
          _context4.next = 9;
          return regeneratorRuntime.awrap(Popular.findById({
            _id: newMovie._id
          }));

        case 9:
          movie = _context4.sent;

          if (movie) {
            _context4.next = 15;
            break;
          }

          newMovie.save();
          return _context4.abrupt("return", res.status(200).json(newMovie));

        case 15:
          message = 'Error - Movie already exist';
          logger.error(message);
          return _context4.abrupt("return", res.status(400).json(message));

        case 18:
          _context4.next = 25;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          message = 'Error - Faild Create new movie';
          logger.error("".concat(message, " : ").concat(_context4.t0));
          return _context4.abrupt("return", res.status(400).json(message));

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

var updatePopular = function updatePopular(req, res) {
  var movie;
  return regeneratorRuntime.async(function updatePopular$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Popular.findById({
            _id: req.params.id
          }));

        case 3:
          movie = _context5.sent;
          if (req.params.name) movie.name = req.params.name;
          if (req.params.runTime) movie.runTime = req.params.runTime;
          if (req.params.categories) movie.categories = req.params.categories;
          if (req.params.releaseDate) movie.releaseDate = req.params.releaseDate;
          if (req.params.actors) movie.actors = req.params.actors;
          if (req.params.storyline) movie.storyline = req.params.storyline;
          Movie.update({
            _id: movie._id
          });
          return _context5.abrupt("return", res.status(200).json({
            movie: movie
          }));

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(400).json({
            error: _context5.t0
          }));

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var deletePopular = function deletePopular(req, res) {
  var movie;
  return regeneratorRuntime.async(function deletePopular$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Popular.findById({
            _id: req.params.id
          }));

        case 3:
          movie = _context6.sent;
          if (movie.isDeleted == false) movie.isDeleted = true;
          movie.update({
            _id: movie._id
          });
          return _context6.abrupt("return", res.status(200).json({
            movie: movie
          }));

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(400).json({
            error: _context6.t0
          }));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  getAllpopulars: getAllpopulars,
  getPopular: getPopular,
  createPopular: createPopular,
  updatePopular: updatePopular,
  deletePopular: deletePopular,
  checkPopulartId: checkPopulartId
};