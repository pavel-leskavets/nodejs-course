const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'board1',
    order = 'order',
    description = 'description',
    userId = 'userId1',
    boardId = 'boardId1',
    columnId = 'columnId1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
