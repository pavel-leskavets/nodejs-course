const router = require('express').Router();
const loginService = require('./login.service');
const { FORBIDDEN, getStatusText } = require('http-status-codes');
const { JWT_SECRET_KEY, TOKEN_EXPIRES } = require('../../common/config');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../helpers/errorHandler');

router.post('/', async (req, res, next) => {
  const user = await loginService.getUserByLogin(req.body);
  try {
    if (!user) {
      throw new ErrorHandler(FORBIDDEN, getStatusText(FORBIDDEN));
    } else {
      const token = jwt.sign(
        { userId: user.id, login: user.login },
        JWT_SECRET_KEY,
        {
          expiresIn: TOKEN_EXPIRES
        }
      );
      return await res.json({ token });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
