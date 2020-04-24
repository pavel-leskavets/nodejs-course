const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../../common/config');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

const checkToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.replace('Bearer ', '');
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    }
    res
      .status(UNAUTHORIZED)
      .json({ success: false, message: getStatusText(UNAUTHORIZED) });
  } catch {
    res
      .status(UNAUTHORIZED)
      .json({ success: false, message: getStatusText(UNAUTHORIZED) });
  }
};

module.exports = checkToken;
