const Task = require('./task.model');

const getAllByBoardId = async boardId => Task.find({ boardId });

const getById = async (boardId, taskId) =>
  Task.find({ boardId }).findOne({ _id: taskId });

const addTask = async task => Task.create(task);

const updateTask = async (boardId, taskId, reqBody) =>
  Task.updateOne({ boardId, _id: taskId }, reqBody);

const deleteTask = async (boardId, taskId) =>
  (await Task.deleteOne({ boardId, _id: taskId })).ok;

// const setUserIdAsNull = async userId => {
//   TASK_DATA.forEach((task, index) => {
//     if (task.userId === userId) {
//       TASK_DATA[index].userId = null;
//     }
//   });
// };
//
// const deleteTaskIfBoardDeleted = async boardId => {
//   TASK_DATA = TASK_DATA.filter(task => task.boardId !== boardId);
// };

module.exports = {
  getAllByBoardId,
  getById,
  addTask,
  updateTask,
  deleteTask
};
