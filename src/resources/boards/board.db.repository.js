const Board = require('./board.model');

const getAll = async () => Board.find({});

const getById = async boardId => Board.findOne({ _id: boardId });

const addBoard = async board => Board.create(board);

const updateBoard = async boardToCreate =>
  (await Board.updateOne({ _id: boardToCreate.id }, boardToCreate)).ok;

const deleteBoard = async boardId =>
  (await Board.deleteOne({ _id: boardId })).ok;

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
