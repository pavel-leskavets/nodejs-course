const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const catchErrors = require('../../helpers/catchErrors');
const { ErrorHandler } = require('../../helpers/errorHandler');
const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');
const { validationResult } = require('express-validator');
const { boardBodyValidation } = require('../../validators/validators');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardService.getAll();
    await res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardService.getById(req.params.id);
    if (!board) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Board with id ${req.params.id} not found`
      );
    } else {
      await res.json(Board.toResponse(board));
    }
  })
);

router.route('/').post(
  boardBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      const newBoard = new Board(req.body);
      await boardService.addBoard(newBoard);
      await res.json(Board.toResponse(newBoard));
    }
  })
);

router.route('/:id').put(
  boardBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    const board = await boardService.updateBoard(req.params.id, req.body);
    if (!errors.isEmpty() || !board) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      await res.json(Board.toResponse(board));
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const deletedBoard = await boardService.deleteBoard(req.params.id);
    if (!deletedBoard) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Board with id ${req.params.id} not found`
      );
    } else {
      await res
        .status(NO_CONTENT)
        .json({ message: 'The board has been deleted' });
    }
  })
);

module.exports = router;
