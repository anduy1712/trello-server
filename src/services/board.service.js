import { BoardModel } from '../models/board.model';
import { cloneDeep } from 'lodash';
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

    if (!board || !board.columns) {
      throw Error('Board not found');
    }
    //Clone Board
    const transformBoard = cloneDeep(board);
    //Filter Column
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );
    //Add cart to each column
    transformBoard.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    //Sort Column by ColumnOrder, this step will pass to front end :))
    //Remove cards
    delete transformBoard.cards;

    return transformBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now()
    };
    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;

    const result = await BoardModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getBoard, update };
