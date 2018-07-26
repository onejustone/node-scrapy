const path = require('path');
const winston = require('winston');
const _ = require('lodash');

function createLogger(filePath) {
  const fileName = path.basename(filePath);

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  })

  // _setLevelForTransports('info');
  return logger;
}

function _setLevelForTransports(logger, level) {
  _.each(logger.transports, (transport) => {
    // eslint-disable-next-line
    transport.level = level;
  });
}

module.exports = createLogger;
