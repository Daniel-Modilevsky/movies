const express = require('express');
const helmet = require('helmet');
const compress = require('compression');
const app = express();
const glob = require('glob');
const path = require('path');
const cors = require('cors');

const defaultRoutes = require('../api/routes/default-route');

// Parser
app.use(helmet());
app.use(compress({ level: 9 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));


function initGlobRouter(){
    const getGlobbedpaths = globPattern => glob.sync(globPattern);
    const serverRoutes = getGlobbedpaths('api/routes/*-route.js');
    serverRoutes.forEach(tempPath => {
        const route = require(path.resolve(tempPath));
        if(tempPath != 'api/routes/default-route.js') 
            app.use(route);
    });
    app.use(defaultRoutes);
}

initGlobRouter();

module.exports = app;