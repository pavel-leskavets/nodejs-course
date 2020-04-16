const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  title: String,
  order: String,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
