const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const getById = async userId => usersRepo.getById(userId);

const addUser = async user => usersRepo.addUser(user);

const updateUser = async (userId, reqBody) =>
  usersRepo.updateUser(userId, reqBody);

const deleteUser = async userId => usersRepo.deleteUser(userId);

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
