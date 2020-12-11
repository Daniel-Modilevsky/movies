const express = require('express');
const helmet = require('helmet');
const compress = require('compression');
const app = express();
const glob = require('glob');
const path = require('path');


//const usersRoutes = require('../api/users/users-route');
const defaultRoutes = require('../api/default/default-route');

// Parser
app.use(helmet());
app.use(compress({ level: 9 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function initGlobRouter(){
    const getGlobbedpaths = globPattern => glob.sync(globPattern);
    const serverRoutes = getGlobbedpaths('api/*/*-route.js');
    serverRoutes.forEach(tempPath => {
        const route = require(path.resolve(tempPath));
        console.log(tempPath);
        if(tempPath != 'api/default/default-route.js') 
            app.use(route);
    });
    app.use(defaultRoutes);
}

initGlobRouter();

module.exports = app;