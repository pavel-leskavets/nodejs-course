const boardsRepo = require('./board.memory.repository');
const idHelper = require('../../helpers/currentIdHelper');
const idValidator = require('../../helpers/columnsIdValidator');

const getAll = () => boardsRepo.getAll();

const getById = async boardId =>
  boardsRepo.BOARD_DATA.find(board => board.id === boardId);

const addBoard = async board => boardsRepo.BOARD_DATA.push(board);

const updateBoard = async (boardId, reqBody) => {
  const currentBoardIndex = idHelper(boardId, boardsRepo.BOARD_DATA);
  const isColumnsIdValid = idValidator(reqBody.columns);
  if (currentBoardIndex !== null && isColumnsIdValid) {
    const updatedBoard = {
      id: boardsRepo.BOARD_DATA[currentBoardIndex].id,
      title: reqBody.title,
      columns: updateColumns(
        boardsRepo.BOARD_DATA[currentBoardIndex].columns,
        reqBody.columns
      )
    };
    boardsRepo.BOARD_DATA[currentBoardIndex] = updatedBoard;
    return updatedBoard;
  }
  return null;
};

const updateColumns = (columns, newColumns) => {
  return columns.map(column => {
    const columnIndex = idHelper(column.id, newColumns);
    if (columnIndex !== null) {
      return {
        id: column.id,
        title: newColumns[columnIndex].title,
        order: newColumns[columnIndex].order
      };
    }
    return column;
  });
};

const deleteBoard = async boardId => {
  const currentBoardIndex = idHelper(boardId, boardsRepo.BOARD_DATA);
  if (currentBoardIndex !== null) {
    return boardsRepo.BOARD_DATA.splice(currentBoardIndex, 1);
  }
  return null;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
