import { BoardModel } from '../models/board.model';

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getBoard = async (id) => {
  try {
    const board = await BoardModel.getBoard(id);
    //Add cart to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    //Sort Column by ColumnOrder, this step will pass to front end :))

    //Remove cards
    delete board.cards;
 
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getBoard };
