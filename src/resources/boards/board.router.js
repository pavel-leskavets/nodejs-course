const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const columnsValidator = require('../../helpers/columnsValidator');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getById(req.params.id);
  if (!board) {
    await res
      .status(404)
      .json({ message: `Board with id ${req.params.id} not found` });
  } else {
    await res.json(board);
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const isColumnsValid = columnsValidator(columns);
  if (!title || !columns || !isColumnsValid) {
    await res.status(400).json({ message: 'Bad request' });
  } else {
    const newBoard = new Board(req.body);
    await boardService.addBoard(newBoard);
    await res.json(newBoard);
  }
});

router.route('/:id').put(async (req, res) => {
  const { title, columns } = req.body;
  const isColumnsValid = columnsValidator(columns);
  const board = await boardService.updateBoard(req.params.id, req.body);
  if (!title || !columns || !isColumnsValid || !board) {
    await res.status(400).json({ message: 'Bad request' });
  } else {
    await res.json(board);
  }
});

router.route('/:id').delete(async (req, res) => {
  const deletedBoard = await boardService.deleteBoard(req.params.id);
  if (deletedBoard === null) {
    await res
      .status(404)
      .json({ message: `Board with id ${req.params.id} not found` });
  } else {
    await res.status(204).json({ message: 'The board has been deleted' });
  }
});

module.exports = router;
