const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const autoIncrement = require('mongoose-auto-increment');


const popularSchema = mongoose.Schema({
    _id: {type: Number, require: true },
    name:  {type: String , require: true },
    runTime: {type: Number , require: true, min: 0},
    categories : { type: [String] ,enumValues:["Comedy", "Action", "Drama", "Crime", "Fantasy", "Romance", "Horror", "Documentaries", "Adventure", "Thriller", "Animation"], require: true},
    releaseDate: { type: Date , require: true},
    actors: { type: [String] , require: true},
    storyline: { type: String , default: 'none'},
    image: {type: String, require: true },
    isdeleted: {type: Boolean, default: false}
},{ collection: 'populars'});


popularSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

let Popular = module.exports = mongoose.model('poplar', popularSchema);




