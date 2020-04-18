const Task = require('./task.model');

const getAllByBoardId = async boardId => Task.find({ boardId });

const getById = async (boardId, taskId) =>
  Task.findOne({ boardId, _id: taskId });

const addTask = async task => Task.create(task);

const updateTask = async (boardId, taskId, reqBody) =>
  (await Task.updateOne({ boardId, _id: taskId }, reqBody)).ok;

const deleteTask = async (boardId, taskId) =>
  (await Task.deleteOne({ boardId, _id: taskId })).ok;

const setUserIdAsNull = async userId =>
  Task.updateMany({ userId }, { userId: null });

const deleteTaskIfBoardDeleted = async boardId => Task.deleteMany({ boardId });

module.exports = {
  getAllByBoardId,
  getById,
  addTask,
  updateTask,
  deleteTask,
  setUserIdAsNull,
  deleteTaskIfBoardDeleted
};
