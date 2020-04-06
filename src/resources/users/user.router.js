const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  await res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (!user) {
    await res
      .status(404)
      .json({ message: `User with id ${req.params.id} not found` });
  } else {
    await res.json(User.toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  if (!req.body.name || !req.body.login || !req.body.password) {
    await res.status(400).json({ message: 'Bad request' });
  } else {
    const newUser = new User(req.body);
    await usersService.addUser(newUser);
    await res.json(User.toResponse(newUser));
  }
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (!req.body.name || !req.body.login || !req.body.password || !user) {
    await res.status(400).json({ message: 'Bad request' });
  } else {
    await res.json(User.toResponse(user));
  }
});

router.route('/:id').delete(async (req, res) => {
  const deletedUser = await usersService.deleteUser(req.params.id);
  if (deletedUser === null) {
    await res
      .status(404)
      .json({ message: `User with id ${req.params.id} not found` });
  } else {
    await res.status(204).json({ message: 'The user has been deleted' });
  }
});

module.exports = router;
