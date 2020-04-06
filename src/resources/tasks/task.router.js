const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAllByBoardId(req.params.boardId);
  await res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await taskService.getById(req.params.boardId, req.params.taskId);
  if (!task) {
    await res
      .status(404)
      .json({ message: `Task with id ${req.params.id} not found` });
  } else {
    await res.json(task);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { title, order, description, userId, boardId } = req.body;
  if (
    !title ||
    order === undefined ||
    !description ||
    userId === undefined ||
    boardId === undefined
  ) {
    await res.status(400).json({ message: 'Bad request' });
  } else {
    const reqBody = { ...req.body };
    reqBody.boardId = req.params.boardId;
    const newTask = new Task(reqBody);
    await taskService.addTask(newTask);
    await res.json(newTask);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { title, order, description, userId, boardId, columnId } = req.body;
  const task = await taskService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  if (
    !title ||
    order === undefined ||
    !description ||
    userId === undefined ||
    boardId === undefined ||
    columnId === undefined ||
    !task
  ) {
    await res.status(400).json({ message: 'Bad request' });
  } else {
    await res.json(task);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const deletedTask = await taskService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );
  if (deletedTask === null) {
    await res
      .status(404)
      .json({ message: `Task with id ${req.params.id} not found` });
  } else {
    await res.status(204).json({ message: 'The task has been deleted' });
  }
});

module.exports = router;
