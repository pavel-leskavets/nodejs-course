const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../helpers/errorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');
const { userBodyValidation } = require('../../validators/validators');
const { validationResult } = require('express-validator');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  const user = await usersService.getById(req.params.id);
  try {
    if (!user) {
      throw new ErrorHandler(
        NOT_FOUND,
        `User with id ${req.params.id} not found`
      );
    } else {
      await res.json(User.toResponse(user));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(userBodyValidation(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      const newUser = new User(req.body);
      await usersService.addUser(newUser);
      await res.json(User.toResponse(newUser));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(userBodyValidation(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const user = await usersService.updateUser(req.params.id, req.body);
    if (!errors.isEmpty() || !user) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      await res.json(User.toResponse(user));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const deletedUser = await usersService.deleteUser(req.params.id);
    if (!deletedUser) {
      throw new ErrorHandler(
        NOT_FOUND,
        `User with id ${req.params.id} not found`
      );
    } else {
      await res
        .status(NO_CONTENT)
        .json({ message: 'The user has been deleted' });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
