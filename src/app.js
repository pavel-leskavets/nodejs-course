const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { NOT_FOUND, getStatusText } = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/authentication/login.router');
const checkToken = require('./resources/authentication/jwt/checkToken');
const { requestLoggerMiddleware } = require('./loggers/logger');
const {
  handleError,
  handleInternalServerError,
  ErrorHandler
} = require('./helpers/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(requestLoggerMiddleware);

app.use('/login', loginRouter);

app.use('/users', checkToken, userRouter);

app.use('/boards', checkToken, boardRouter);

app.use('/boards', checkToken, taskRouter);

app.use('/*', async (req, res, next) => {
  await res.status(NOT_FOUND).json({ message: getStatusText(NOT_FOUND) });
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return handleError(err, req, res);
  }
  next();
});

app.use((req, res) => {
  handleInternalServerError(req, res);
});

module.exports = app;
