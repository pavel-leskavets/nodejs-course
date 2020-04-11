const { createLogger, format, transports } = require('winston');
const path = require('path');
const { getStatusText } = require('http-status-codes');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/info.log'),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../logs/exceptions.log'),
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

const requestLoggerMiddleware = (req, res, next) => {
  const { url, query, body, method } = req;
  logger.info('Request logging', {
    url,
    method,
    query,
    body
  });
  next();
};

const errorLogger = (statusCode, req) => {
  const { url, query, body, method } = req;
  logger.error('Request Error', {
    statusCode,
    statusText: getStatusText(statusCode),
    url,
    method,
    query,
    body
  });
};

module.exports = { requestLoggerMiddleware, errorLogger };
