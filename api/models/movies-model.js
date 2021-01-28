const mongoose = require('mongoose');
const logger = require('../../lib/logs');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:  {type: String , require: true },
    year: { type: Number , require: true , min: 1950, max: 2040},
    runTime: {type: Number , require: true, min: 0},
    categories : { type: [String] ,npm:["Comedy", "Action", "Drama", "Crime", "Fantasy", "Romance", "Horror", "Documentaries", "Adventure", "Thriller", "Animation"], require: true},
    releaseDate: { type: Date , require: true},
    director: { type: String },
    writer: { type: String },
    actors: { type: [String] , require: true},
    storyline: { type: String , default: 'none'},
    rate: {type: Number , default: 2},
    image: {type: String, require: true },
    isdeleted: {type: Boolean, default: false}
},{ collection: 'movies'});

movieSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

let Movie = module.exports = mongoose.model('movie', movieSchema);




