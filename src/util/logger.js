const { createLogger, format, transports, config } = require('winston')
const { combine, timestamp, label, printf, prettyPrint, colorize } = format

const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  levels: config.syslog.levels,
  transports: [
    new transports.Console(),
    new transports.File({filename: 'error.log', level: 'error'}),
    new transports.File({filename: 'conbined.log'})
  ]
})

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new transports.Console({
//     format: format.simple()
//   }))
// }

module.exports = logger
