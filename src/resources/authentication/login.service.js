const loginRepo = require('./login.db');
const User = require('../users/user.model');

const getUserByLogin = async request => {
  const user = await loginRepo.getUserByLogin(request.login);
  if (user) {
    const isPasswordsMatch = await User.checkPassword(
      request.password,
      user.password
    );
    return isPasswordsMatch ? user : undefined;
  }
};

module.exports = { getUserByLogin };
