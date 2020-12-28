const mongoose = require('mongoose');
const logger = require('../../lib/logs');


const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: { type: String , require: true },
    creationBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    creationByName: { type: String , require: true },
    commentOn: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', require: true },
    creationDate: { type: Date , default: Date.now  },
    isPublic: {type: Boolean, default: false},
    isdeleted: {type: Boolean, default: false}
},{ collection: 'comments'});


commentSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

let Comment = module.exports = mongoose.model('Comment', commentSchema);