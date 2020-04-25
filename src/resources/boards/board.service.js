const boardsRepo = require('./board.db');
const tasksRepo = require('../tasks/task.db');

const getAll = async () => boardsRepo.getAll();

const getById = async boardId => boardsRepo.getById(boardId);

const addBoard = async board => boardsRepo.addBoard(board);

const updateBoard = async (boardId, reqBody) =>
  boardsRepo.updateBoard({ id: boardId, ...reqBody });

const deleteBoard = async boardId => {
  await tasksRepo.deleteTaskIfBoardDeleted(boardId);
  return boardsRepo.deleteBoard(boardId);
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
