const http = require('http');
const app = require('./lib/express');
const logger = require('./lib/logs');
const config = require('./config/config-default');
const { initConnection } = require('./lib/mongoose');

initConnection();

const server = http.createServer(app);
server.listen(config.PORT, () => logger.info(`Lisining to Server : ${config.PORT}`));
