const User = require('./user.model');

const getAll = async () => User.find({});

const getById = async userId => User.findOne({ _id: userId });

const addUser = async user => User.create(user);

const updateUser = async userToUpdate =>
  (await User.updateOne({ _id: userToUpdate.id }, userToUpdate)).ok;

const deleteUser = async userId => (await User.deleteOne({ _id: userId })).ok;

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
