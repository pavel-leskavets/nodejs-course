const { check } = require('express-validator');

const userBodyValidation = () => {
  return [
    check('name', 'name is not passed').exists(),
    check('login', 'login is not passed').exists(),
    check('password', 'password is not passed').exists(),
    check('password', 'wrong length').isLength({ min: 4, max: 15 })
  ];
};

const boardBodyValidation = () => {
  return [
    check('title', 'title is not passed').exists(),
    check('columns', 'columns is not passed').exists()
  ];
};

const taskBodyValidation = () => {
  return [
    check('title', 'title is not passed').exists(),
    check('order', 'order is not passed').exists(),
    check('description', 'description is not passed').exists(),
    check('userId', 'userId is not passed').exists(),
    check('boardId', 'boardId is not passed').exists()
  ];
};

const loginBodyValidation = () => {
  return [
    check('login', 'login is not passed').exists(),
    check('password', 'password is not passed').exists()
  ];
};

module.exports = {
  userBodyValidation,
  boardBodyValidation,
  taskBodyValidation,
  loginBodyValidation
};
