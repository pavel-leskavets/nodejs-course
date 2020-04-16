const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: [columnSchema]
});

const columnsToResponse = columns => {
  return columns.map(column => {
    const { id, title, order } = column;
    return { id, title, order };
  });
};

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return {
    id,
    title,
    columns: columnsToResponse(columns)
  };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
