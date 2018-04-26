'use strict';

const server = require('./lib/server');
const logger = require('./lib/logger');

server.start(process.env.PORT, () => logger.log(loger.INFO, `MAIN: listening on ${process.env.PORT}`));