const app = require('./lib/express');
const logger = require('./lib/logs');
const { initConnection } = require('./lib/mongoose');
const port = process.env.PORT || 8080;
initConnection();

app.listen(port , () => logger.info(`Lisining to Server : ${port}`));
