"use strict";

var mongoose = require('mongoose');

var logger = require('../../lib/logs');

var config = require('../../config/config-default');

var Movie = require('../models/movies-model');

var upload = require('../../lib/images');

var fs = require('fs');

var axios = require("axios")["default"];

var _require = require('express'),
    query = _require.query,
    json = _require.json;

var url = require('url');

var checkMovietId = function checkMovietId(req, res, next) {
  var movie;
  return regeneratorRuntime.async(function checkMovietId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Movie.findOne({
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

var getAllmovies = function getAllmovies(req, res) {
  var movies;
  return regeneratorRuntime.async(function getAllmovies$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Movie.find());

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

var getMovie = function getMovie(req, res) {
  var movie;
  return regeneratorRuntime.async(function getMovie$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Movie.findOne({
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

var createMovie = function createMovie(req, res) {
  var newMovie, movie;
  return regeneratorRuntime.async(function createMovie$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!(!req.body.name || !req.body.year || !req.body.runTime || !req.body.categories || !req.body.releaseDate)) {
            _context4.next = 4;
            break;
          }

          logger.error('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params');
          return _context4.abrupt("return", res.status(400).send('Error - Missing Params - can not complete valis creation without (name & year & runTim & categories & releaseDate) params'));

        case 4:
          newMovie = new Movie({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            year: req.body.year,
            runTime: req.body.runTime,
            categories: req.body.categories,
            releaseDate: req.body.releaseDate,
            image: req.file.path.replace('\\', '/')
          });
          if (req.body.director) newMovie.director = req.body.director;
          if (req.body.writer) newMovie.writer = req.body.writer;
          if (req.body.actors) newMovie.actors = req.body.actors;
          if (req.body.storyline) newMovie.storyline = req.body.storyline;
          if (req.body.rate) newMovie.rate = req.body.rate;
          _context4.next = 12;
          return regeneratorRuntime.awrap(Movie.findById({
            _id: newMovie._id
          }));

        case 12:
          movie = _context4.sent;

          if (movie) {
            _context4.next = 18;
            break;
          }

          newMovie.save();
          return _context4.abrupt("return", res.status(200).json(newMovie));

        case 18:
          message = 'Error - Movie already exist';
          logger.error(message);
          return _context4.abrupt("return", res.status(400).json(message));

        case 21:
          _context4.next = 28;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          message = 'Error - Faild Create new movie';
          logger.error("".concat(message, " : ").concat(_context4.t0));
          return _context4.abrupt("return", res.status(400).json(message));

        case 28:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

var updateMovie = function updateMovie(req, res) {
  var movie;
  return regeneratorRuntime.async(function updateMovie$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Movie.findById({
            _id: req.params.id
          }));

        case 3:
          movie = _context5.sent;
          if (req.params.name) movie.name = req.params.name;
          if (req.params.year) movie.year = req.params.year;
          if (req.params.runTime) movie.runTime = req.params.runTime;
          if (req.params.categories) movie.categories = req.params.categories;
          if (req.params.releaseDate) movie.releaseDate = req.params.releaseDate;
          if (req.params.director) movie.director = req.params.director;
          if (req.params.writer) movie.writer = req.params.writer;
          if (req.params.actors) movie.actors = req.params.actors;
          if (req.params.storyline) movie.storyline = req.params.storyline;
          if (req.params.rate) movie.rate = req.params.rate;
          Movie.update({
            _id: movie._id
          });
          return _context5.abrupt("return", res.status(200).json({
            movie: movie
          }));

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(400).json({
            error: _context5.t0
          }));

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var deleteMovie = function deleteMovie(req, res) {
  var movie;
  return regeneratorRuntime.async(function deleteMovie$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Movie.findById({
            _id: req.params.id
          }));

        case 3:
          movie = _context6.sent;
          if (movie.isDeleted == false) movie.isDeleted = true;
          movie.update({
            _id: movie._id
          });
          return _context6.abrupt("return", res.status(200).json({
            msg: "movie : ".concat(req.params.id, " deleted")
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

var findUserMovies = function findUserMovies(req, res) {
  var movies;
  return regeneratorRuntime.async(function findUserMovies$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.find({
            _id: req.params.id
          }).populate({
            path: 'movie',
            model: 'Movie',
            select: 'moviesCollection'
          }));

        case 3:
          movies = _context7.sent;
          logger.info(movies.length);
          return _context7.abrupt("return", res.status(200).json({
            message: message
          }));

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          message = "Error - Faild Search  ".concat(user.user_name, " movies");
          logger.error("".concat(message, " : ").concat(_context7.t0));
          return _context7.abrupt("return", res.status(400).json(message));

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getByCategory = function getByCategory(req, res) {
  var movies;
  return regeneratorRuntime.async(function getByCategory$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Movie.find({
            categories: {
              $regex: "".concat(req.params.categoryName)
            }
          }).limit(5).sort());

        case 3:
          movies = _context8.sent;
          return _context8.abrupt("return", res.status(200).json(movies));

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", res.status(400).json({
            error: _context8.t0
          }));

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var IMDB = function IMDB(req, res) {
  var test, name, options, options2;
  return regeneratorRuntime.async(function IMDB$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          name = req.body.name;
          options = {
            method: 'GET',
            url: "".concat(config.URL_ID, "/").concat(name),
            headers: {
              'x-rapidapi-key': config.X_KEY,
              'x-rapidapi-host': config.X_HOST
            }
          };
          _context9.next = 4;
          return regeneratorRuntime.awrap(axios.request(options).then(function (response) {
            var data = response.data;
            var id = data.titles[0].id;
            test = id;
          })["catch"](function (error) {
            logger.error(error);
          }));

        case 4:
          options2 = {
            method: 'GET',
            url: "".concat(config.URL_FILM, "/").concat(test),
            headers: {
              'x-rapidapi-key': config.X_KEY,
              'x-rapidapi-host': config.X_HOST
            }
          };
          _context9.next = 7;
          return regeneratorRuntime.awrap(axios.request(options2).then(function (response) {
            var data = response.data;
            return res.status(200).json({
              data: data
            });
          })["catch"](function (error) {
            logger.error(error);
          }));

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var getSmartMovie = function getSmartMovie(req, res) {
  var movies, temp, Aliens, FavCategory, vehicle, Pet, Scarlett, counter, allMoviesSelected, scarletMovies, romanceMovies, carsMovies, SciMovies, item, FavCategoryarr, _item;

  return regeneratorRuntime.async(function getSmartMovie$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Movie.find());

        case 2:
          movies = _context10.sent;
          temp = {
            Aliens: req.body.Aliens,
            FavCategory: req.body.FavCategory,
            vehicle: req.body.vehicle,
            Scarlett: req.body.Scarlett,
            Pet: req.body.Pet
          };
          logger.error(JSON.stringify(temp));
          Aliens = String(temp.Aliens);
          logger.debug(Aliens);
          FavCategory = String(temp.Category);
          vehicle = String(temp.vehicle);
          Pet = String(temp.Pet);
          Scarlett = Number(temp.Scarlett);
          counter = 0;
          allMoviesSelected = []; //For Scralet >6 return the highest rated movie of her in the DB

          if (Scarlett > 6) {
            scarletMovies = [];
            counter++;
            movies.forEach(function (movie) {
              movie.actors.forEach(function (actor) {
                if (actor.includes("Scarlett Johansson")) {
                  scarletMovies.push({
                    "id": movie.id,
                    "name": movie.name,
                    "rating": movie.rate,
                    "categories": movie.categories,
                    "actors": movie.actors,
                    "writer": movie.writer,
                    "director": movie.director
                  });
                  allMoviesSelected.push({
                    "id": movie.id,
                    "name": movie.name,
                    "rating": movie.rate,
                    "categories": movie.categories,
                    "actors": movie.actors,
                    "writer": movie.writer,
                    "director": movie.director
                  });
                }
              });
            });
          } //For Pet = true brings all the Romance movies and random 1 of them


          if (Pet == "Yes") {
            romanceMovies = [];
            counter++;
            movies.forEach(function (movie) {
              movie.categories.forEach(function (categorie) {
                if (categorie.includes("Romance")) {
                  romanceMovies.push({
                    "id": movie.id,
                    "name": movie.name,
                    "rating": movie.rate,
                    "categories": movie.categories,
                    "actors": movie.actors,
                    "writer": movie.writer,
                    "director": movie.director
                  });
                  allMoviesSelected.push({
                    "id": movie.id,
                    "name": movie.name,
                    "rating": movie.rate,
                    "categories": movie.categories,
                    "actors": movie.actors,
                    "writer": movie.writer,
                    "director": movie.director
                  });
                }
              });
            });
          }

          if (vehicle == "Car") {
            carsMovies = [];
            counter++;
            movies.forEach(function (movie) {
              if (containsWord(movie.storyline, "car") || containsWord(movie.storyline, "cars") || containsWord(movie.storyline, "Car") || containsWord(movie.storyline, "Cars")) {
                carsMovies.push({
                  "id": movie.id,
                  "name": movie.name,
                  "rating": movie.rate,
                  "categories": movie.categories,
                  "actors": movie.actors,
                  "writer": movie.writer,
                  "director": movie.director,
                  "story": movie.storyline
                });
                allMoviesSelected.push({
                  "id": movie.id,
                  "name": movie.name,
                  "rating": movie.rate,
                  "categories": movie.categories,
                  "actors": movie.actors,
                  "writer": movie.writer,
                  "director": movie.director
                });
              }
            });
          } //Bring random movie of Sci-Fi


          if (Aliens == "Yes") {
            SciMovies = [];
            counter++;
            movies.forEach(function (movie) {
              movie.categories.forEach(function (categorie) {
                if (categorie.includes("Sci-Fi")) {
                  SciMovies.push({
                    "id": movie.id,
                    "name": movie.name,
                    "rating": movie.rate,
                    "categories": movie.categories,
                    "actors": movie.actors,
                    "writer": movie.writer,
                    "director": movie.director
                  });
                  allMoviesSelected.push({
                    "id": movie.id,
                    "name": movie.name,
                    "rating": movie.rate,
                    "categories": movie.categories,
                    "actors": movie.actors,
                    "writer": movie.writer,
                    "director": movie.director
                  });
                }
              });
            });
          }

          logger.debug(counter);

          if (!(counter > 0)) {
            _context10.next = 24;
            break;
          }

          item = allMoviesSelected[Math.floor(Math.random() * allMoviesSelected.length)];
          logger.info(JSON.stringify(allMoviesSelected));
          return _context10.abrupt("return", res.status(200).json({
            item: item
          }));

        case 24:
          logger.warn("Other");
          FavCategoryarr = [];
          movies.forEach(function (movie) {
            movie.categories.forEach(function (categorie) {
              if (categorie.includes(FavCategory)) {
                FavCategoryarr.push({
                  "id": movie.id,
                  "name": movie.name,
                  "rating": movie.rate,
                  "categories": movie.categories,
                  "actors": movie.actors,
                  "writer": movie.writer,
                  "director": movie.director
                });
              }
            });
          });
          logger.info(FavCategoryarr);
          _item = FavCategoryarr[Math.floor(Math.random() * FavCategoryarr.length)];
          logger.info(JSON.stringify(_item));
          return _context10.abrupt("return", res.status(200).json({
            item: _item
          }));

        case 31:
        case "end":
          return _context10.stop();
      }
    }
  });
};

function containsWord(str, word) {
  return str.match(new RegExp("\\b" + word + "\\b")) != null;
}

module.exports = {
  getAllmovies: getAllmovies,
  getMovie: getMovie,
  createMovie: createMovie,
  updateMovie: updateMovie,
  deleteMovie: deleteMovie,
  checkMovietId: checkMovietId,
  findUserMovies: findUserMovies,
  getByCategory: getByCategory,
  IMDB: IMDB,
  getSmartMovie: getSmartMovie
};