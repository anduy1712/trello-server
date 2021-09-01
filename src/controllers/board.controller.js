import { BoardService } from '../services/board.service';
import { HttpStatusCode } from '../utilities/constants';

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    });
  }
};

const getBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardService.getBoard(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    });
  }
};

export const BoardController = { createNew, getBoard, update };
