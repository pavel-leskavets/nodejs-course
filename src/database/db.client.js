const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

module.exports = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    // db.dropDatabase();
    User.create({ name: 'admin', login: 'admin', password: 'admin' });
    console.log('We are connected');
    callback();
  });
};
