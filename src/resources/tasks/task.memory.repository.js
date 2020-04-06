let TASK_DATA = [
  {
    id: '447e73b2-e93d-440b-b587-04bbbbbb80149cba8e',
    title: 'Pavel',
    order: 'Jake',
    description: 'Jake',
    userId: '9bc061c9-c548-40a2-a7c0-0e32f8ea5ae9',
    boardId: '447e73b2-e93d-440b-bs587-0480149cba8e',
    columnId: '447e73b2-e93d-44sds0b-bs587-048vcv0149cba8e'
  },
  {
    id: '447e73b2-e93d-440b-b587-0480149cba8e',
    title: 'Lee',
    order: 'Jake',
    description: 'Jake',
    userId: '9bc061c9-c548-40a2-a7c0-0e32f8ea5ae9',
    boardId: '9bc061c9-c548-40a2-a7xdxcvxcvxdc0-d0e32f8ea5ae9',
    columnId: '447e73b2-e93d-44sdvxcvxcvs0xcbbb-bs587-0480149cba8e'
  },
  {
    id: '447e73b2-e93d-440b-b587-0480149cba8e',
    title: 'Bruce',
    order: 'Jake',
    description: 'Jake',
    userId: '9bc061c9-c548-40a2-a7c0-0e32f8ea5ae9',
    boardId: 'dd738cfsdfsdf9-b578-4d34-989e-227dcd9483b6e',
    columnId: '447e73b2-e93d-44ccssds0b-bs587-cxvxcv0480149cba8e'
  }
];

const getAllByBoardId = async boardId =>
  TASK_DATA.filter(task => task.boardId === boardId);

const getById = async (boardId, taskId) =>
  TASK_DATA.filter(task => task.boardId === boardId).find(
    task => task.id === taskId
  );

const addTask = async task => TASK_DATA.push(task);

const updateTask = async (boardId, taskId, reqBody) => {
  const currentTaskIndex = TASK_DATA.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (currentTaskIndex !== null && currentTaskIndex >= 0) {
    const updatedTask = {
      id: TASK_DATA[currentTaskIndex].id,
      ...reqBody
    };
    TASK_DATA[currentTaskIndex] = updatedTask;
    return updatedTask;
  }
  return null;
};

const deleteTask = async (boardId, taskId) => {
  const currentTaskIndex = TASK_DATA.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  return currentTaskIndex !== null && currentTaskIndex >= 0
    ? TASK_DATA.splice(currentTaskIndex, 1)
    : null;
};

const setUserIdAsNull = async userId => {
  TASK_DATA.forEach((task, index) => {
    if (task.userId === userId) {
      TASK_DATA[index].userId = null;
    }
  });
};

const deleteTaskIfBoardDeleted = async boardId => {
  TASK_DATA = TASK_DATA.filter(task => task.boardId !== boardId);
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
