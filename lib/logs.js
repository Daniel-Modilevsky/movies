const log = require('log-to-file');
const moment = require('moment');
const { greenBright, blueBright, redBright, yellowBright, cyanBright, grey } = require('chalk');
require('dotenv').config()

function timeStamp() {
    return moment().format('DD/MM/YYYY HH:mm:ss');
}


const logger = {
    info: function (msg) {
        console.log(`${greenBright('info:')} ${grey(timeStamp())} ${msg}`);
        //log("Info : " + msg + '\n', process.env.logFile);
    },
    error: function (msg) {
        console.log(`${redBright('error:')} ${grey(timeStamp())} ${msg}`);
        log("Error : " + msg + '\n', process.env.logFile);
    },
    http: function (msg) {
        console.log(`${cyanBright('http:')} ${grey(timeStamp())} ${msg}`);
        //log("Http : " + msg + '\n', process.env.logFile);
    },
    warn: function (msg) {
        console.log(`${yellowBright('warn:')} ${grey(timeStamp())} ${msg}`);
        log("Warn : " + msg + '\n', process.env.logFile);
    },
    debug: function (msg) {
        console.log(`${blueBright('debug:')} ${grey(timeStamp())} ${msg}`);
        //log("Warn : " + msg + '\n', process.env.logFile);
    }
};


module.exports = logger;