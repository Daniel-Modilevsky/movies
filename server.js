const http = require('http');
const app = require('./lib/express');
const logger = require('./lib/logs');
const config = require('./config/config-default');
const { initConnection } = require('./lib/mongoose');
const port = process.env.PORT || 8080;
initConnection();

//const server = http.createServer(app);
app.listen(port , () => logger.info(`Lisining to Server : ${port}`));
