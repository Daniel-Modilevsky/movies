const dotenv =  require('dotenv');
dotenv.config();

// enviroment vatiable
const config = {
    //PORT: process.env.port,
    LOGFILE: process.env.logFile,
    CS: process.env.CS,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    OPTIONS: process.env.options,
    URL_ID: process.env.urlIMDBid,
    URL_FILM: process.env.urlIMDBFilm,
    X_KEY: process.env.xrapidapikey,
    X_HOST: process.env.xrapidapihost
}


// not changed variable 
// const consts = {
    // sizeArray = 20;
//}  

module.exports = config;