const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { ErrorHandler } = require('../../helpers/errorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getAllByBoardId(req.params.boardId);
    if (tasks && !tasks.length) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Task with id ${req.params.boardId} not found`
      );
    } else {
      await res.json(tasks);
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const task = await taskService.getById(
      req.params.boardId,
      req.params.taskId
    );
    if (!task) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Task with id ${req.params.boardId} not found`
      );
    } else {
      await res.json(task);
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const { title, order, description, userId, boardId } = req.body;
    if (
      !title ||
      order === undefined ||
      !description ||
      userId === undefined ||
      boardId === undefined
    ) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      const reqBody = { ...req.body };
      reqBody.boardId = req.params.boardId;
      const newTask = new Task(reqBody);
      await taskService.addTask(newTask);
      await res.json(newTask);
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
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
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      await res.json(task);
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    const deletedTask = await taskService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );
    if (deletedTask === null) {
      throw new ErrorHandler(
        NOT_FOUND,
        `User with id ${req.params.boardId} not found`
      );
    } else {
      await res
        .status(NO_CONTENT)
        .json({ message: 'The task has been deleted' });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
