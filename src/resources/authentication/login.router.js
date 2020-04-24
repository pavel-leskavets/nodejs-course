const router = require('express').Router();
const loginService = require('./login.service');
const { FORBIDDEN, BAD_REQUEST, getStatusText } = require('http-status-codes');
const { JWT_SECRET_KEY, TOKEN_EXPIRES } = require('../../common/config');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../helpers/errorHandler');
const { validationResult } = require('express-validator');
const { loginBodyValidation } = require('../../validators/validators');

router.post('/', loginBodyValidation(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    }
    const user = await loginService.getUserByLogin(req.body);
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
