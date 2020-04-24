const User = require('../users/user.model');

const getUserByLogin = async login => await User.findOne({ login });

module.exports = { getUserByLogin };
