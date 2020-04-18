const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = async () => usersRepo.getAll();

const getById = async userId => usersRepo.getById(userId);

const addUser = async user => usersRepo.addUser(user);

const updateUser = async (userId, reqBody) =>
  usersRepo.updateUser({ id: userId, ...reqBody });

const deleteUser = async userId => {
  await tasksRepo.setUserIdAsNull(userId);
  return usersRepo.deleteUser(userId);
};

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
