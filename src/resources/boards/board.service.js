const boardsRepo = require('./board.db.repository');

const getAll = async () => boardsRepo.getAll();

const getById = async boardId => boardsRepo.getById(boardId);

const addBoard = async board => boardsRepo.addBoard(board);

const updateBoard = async (boardId, reqBody) =>
  boardsRepo.updateBoard({ id: boardId, ...reqBody });

const deleteBoard = async boardId => boardsRepo.deleteBoard(boardId);

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
