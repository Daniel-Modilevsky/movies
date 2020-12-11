const mongoose = require('mongoose');
const logger = require('../../lib/logs');


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    moviesCollection: { type: [Schema.Types.ObjectId], ref: 'Movie' },
    isAdmin: {type: Boolean, default: false},
    isdeleted: {type: Boolean, default: false}
},{ collection: 'users'});


userSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

let User = module.exports = mongoose.model('User', userSchema);