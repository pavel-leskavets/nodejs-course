const idHelper = require('../../helpers/currentIdHelper');
const idValidator = require('../../helpers/columnsIdValidator');
const taskService = require('../tasks/task.service');

const BOARD_DATA = [
  {
    id: '447e73b2-e93d-440b-bs587-0480149cba8e',
    title: 'Pavel',
    columns: [
      {
        id: '447e73b2-e93d-44sds0b-bs587-048vcv0149cba8e',
        title: 'Pavel',
        order: 'sdsdsd'
      },
      {
        id: '447e73b2-e93d-440b-bsvcvcvcxcv58sds7-0480149cba8e',
        title: 'Pavel',
        order: 'sdsdsd'
      }
    ]
  },
  {
    id: '9bc061c9-c548-40a2-a7xdxcvxcvxdc0-d0e32f8ea5ae9',
    title: 'Max',
    columns: [
      {
        id: '447e73b2-e93d-44sdvxcvxcvs0xcbbb-bs587-0480149cba8e',
        title: 'Pavel',
        order: 'sdsdsd'
      },
      {
        id: '447e73b2-e9xc3d-440b-bs58sds7sdfsdf-0480149cba8e',
        title: 'Pavel',
        order: 'sdsdsd'
      }
    ]
  },
  {
    id: 'dd738cfsdfsdf9-b578-4d34-989e-227dcd9483b6e',
    title: 'John',
    columns: [
      {
        id: '447e73b2-e93d-44ccssds0b-bs587-cxvxcv0480149cba8e',
        title: 'Pavel',
        order: 'sdxcsdsd'
      },
      {
        id: '447e73b2-e93d-xx4sdfsdfv4xcxc0b-bs58sds7-0480149cba8e',
        title: 'Pavel',
        order: 'sdsdxcsd'
      }
    ]
  }
];

const getAll = async () => BOARD_DATA;

const getById = async boardId => BOARD_DATA.find(board => board.id === boardId);

const addBoard = async board => BOARD_DATA.push(board);

const updateBoard = async (boardId, reqBody) => {
  const currentBoardIndex = idHelper(boardId, BOARD_DATA);
  const isColumnsIdValid = idValidator(reqBody.columns);
  if (currentBoardIndex !== null && isColumnsIdValid) {
    const updatedBoard = {
      id: BOARD_DATA[currentBoardIndex].id,
      title: reqBody.title,
      columns: updateColumns(
        BOARD_DATA[currentBoardIndex].columns,
        reqBody.columns
      )
    };
    BOARD_DATA[currentBoardIndex] = updatedBoard;
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
  const currentBoardIndex = idHelper(boardId, BOARD_DATA);
  if (currentBoardIndex !== null) {
    await taskService.deleteTaskIfBoardDeleted(boardId);
    return BOARD_DATA.splice(currentBoardIndex, 1);
  }
  return null;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
