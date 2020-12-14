const mongoose = require('mongoose');
const logger = require('./logs');
const config = require('../config/config-default' );

const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, user: config.DB_USER,pass: config.DB_PASS };


const initConnection = async () => {
    try{
        await mongoose.connect(config.CS, options);
        logger.info(`connected to MongoDB online to DB : ${mongoose.connection.db.databaseName}`);
    }
    catch(error){
        logger.error(`Connection FAILD - connection error: ${error}`);
        logger.error(`Server shuting down`);
        process.exit();
    }
}
    
module.exports = { initConnection }
