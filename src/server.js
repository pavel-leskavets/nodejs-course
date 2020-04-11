const { PORT } = require('./common/config');
const app = require('./app');

process
  .on('unhandledRejection', (reason, promise) => {
    console.error(reason, 'Unhandled Rejection at Promise', promise);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
