const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = boardId =>
  tasksRepo.TASK_DATA.filter(task => task.boardId === boardId);

const getById = async (boardId, taskId) =>
  tasksRepo.TASK_DATA.filter(task => task.boardId === boardId).find(
    task => task.id === taskId
  );

const addTask = async task => tasksRepo.TASK_DATA.push(task);

const updateTask = async (boardId, taskId, reqBody) => {
  const currentTaskIndex = tasksRepo.TASK_DATA.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (currentTaskIndex !== null && currentTaskIndex >= 0) {
    const updatedTask = {
      id: tasksRepo.TASK_DATA[currentTaskIndex].id,
      ...reqBody
    };
    tasksRepo.TASK_DATA[currentTaskIndex] = updatedTask;
    return updatedTask;
  }
  return null;
};

const deleteTask = async (boardId, taskId) => {
  const currentTaskIndex = tasksRepo.TASK_DATA.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  return currentTaskIndex !== null && currentTaskIndex >= 0
    ? tasksRepo.TASK_DATA.splice(currentTaskIndex, 1)
    : null;
};

const setUserIdAsNull = async userId => {
  tasksRepo.TASK_DATA.forEach((task, index) => {
    if (task.userId === userId) {
      tasksRepo.TASK_DATA[index].userId = null;
    }
  });
};

const deleteTaskIfBoardDeleted = async boardId => {
  tasksRepo.TASK_DATA = tasksRepo.TASK_DATA.filter(
    task => task.boardId !== boardId
  );
};

module.exports = {
  getAllByBoardId,
  getById,
  addTask,
  updateTask,
  deleteTask,
  setUserIdAsNull,
  deleteTaskIfBoardDeleted
};
