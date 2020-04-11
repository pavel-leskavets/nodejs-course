const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { errorLogger } = require('../loggers/logger');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res) => {
  const { statusCode, message } = err;
  errorLogger(statusCode, req);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

const handleInternalServerError = (req, res) => {
  errorLogger(INTERNAL_SERVER_ERROR, req);
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = { ErrorHandler, handleError, handleInternalServerError };
