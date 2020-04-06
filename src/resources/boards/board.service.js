const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();

const getById = async boardId => boardsRepo.getById(boardId);

const addBoard = async board => boardsRepo.addBoard(board);

const updateBoard = async (boardId, reqBody) =>
  boardsRepo.updateBoard(boardId, reqBody);

const deleteBoard = async boardId => boardsRepo.deleteBoard(boardId);

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
