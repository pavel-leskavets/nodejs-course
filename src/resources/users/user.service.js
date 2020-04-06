const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');
const idHelper = require('../../helpers/currentIdHelper');

const getAll = () => usersRepo.getAll();

const getById = async userId =>
  usersRepo.USER_DATA.find(user => user.id === userId);

const addUser = async user => usersRepo.USER_DATA.push(user);

const updateUser = async (userId, reqBody) => {
  const currentUserIndex = idHelper(userId, usersRepo.USER_DATA);
  if (currentUserIndex !== null) {
    const updatedUser = {
      id: usersRepo.USER_DATA[currentUserIndex].id,
      ...reqBody
    };
    usersRepo.USER_DATA[currentUserIndex] = updatedUser;
    return updatedUser;
  }
  return null;
};

const deleteUser = async userId => {
  const currentUserIndex = idHelper(userId, usersRepo.USER_DATA);
  if (currentUserIndex !== null) {
    await taskService.setUserIdAsNull(userId);
    return usersRepo.USER_DATA.splice(currentUserIndex, 1);
  }
  return null;
};

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
