const tasksRepo = require('./task.db');

const getAllByBoardId = async boardId => tasksRepo.getAllByBoardId(boardId);

const getById = async (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const addTask = async task => tasksRepo.addTask(task);

const updateTask = async (boardId, taskId, reqBody) =>
  tasksRepo.updateTask(boardId, taskId, reqBody);

const deleteTask = async (boardId, taskId) =>
  tasksRepo.deleteTask(boardId, taskId);

const setUserIdAsNull = async userId => tasksRepo.setUserIdAsNull(userId);

const deleteTaskIfBoardDeleted = async boardId =>
  tasksRepo.deleteTaskIfBoardDeleted(boardId);

module.exports = {
  getAllByBoardId,
  getById,
  addTask,
  updateTask,
  deleteTask,
  setUserIdAsNull,
  deleteTaskIfBoardDeleted
};
