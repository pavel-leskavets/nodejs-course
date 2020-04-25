const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const catchErrors = require('../../helpers/catchErrors');
const { ErrorHandler } = require('../../helpers/errorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');
const { userBodyValidation } = require('../../validators/validators');
const { validationResult } = require('express-validator');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (!user) {
      throw new ErrorHandler(
        NOT_FOUND,
        `User with id ${req.params.id} not found`
      );
    } else {
      await res.json(User.toResponse(user));
    }
  })
);

router.route('/').post(
  userBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      const newUser = new User(req.body);
      await usersService.addUser(newUser);
      await res.json(User.toResponse(newUser));
    }
  })
);

router.route('/:id').put(
  userBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    const user = await usersService.updateUser(req.params.id, req.body);
    if (!errors.isEmpty() || !user) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      await res.json(User.toResponse(user));
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
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
  })
);

module.exports = router;
