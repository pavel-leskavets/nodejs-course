const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'board1', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column({ ...column }));
  }
}

class Column {
  constructor({ id = uuid(), title = 'board1', order = 'order1' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
