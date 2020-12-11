const mongoose = require('mongoose');
const logger = require('../../lib/logs');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:  {type: String , require: true },
    year: { type: Number , require: true , min: 1950, max: 2040},
    runTime: {type: Number , require: true, min: 0},
    categories : { type: [String] ,enum:["Comedy", "Action", "Drama", "Crime", "Fantasy", "Romance", "Horror", "Documentaries"], require: true},
    releaseDate: { type: Date , require: true},
    director: { type: String , default: 'none'},
    writer: { type: String , default: 'none'},
    actors: { type: [String] , default: 'none'},
    storyline: { type: String , default: 'none'},
    rate: {type: Number , default: 2},
    isdeleted: {type: Boolean, default: false}
},{ collection: 'movies'});


movieSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

let Movie = module.exports = mongoose.model('movie', movieSchema);




