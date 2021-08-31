import Joi from 'joi';
import { getDB } from '../configs/mongodb.js';
import { ObjectId } from 'mongodb';
import { ColumnModel } from './column.model.js';
import { CardModel } from './card.model.js';

//Define Board Collection
const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    const resultFinal = await getDB()
      .collection(boardCollectionName)
      .findOne(result.insertedId);
    return resultFinal;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} newColumnId
 */
const pushColumnOrder = async (boardId, newColumnId) => {
  try {
    const result = getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: newColumnId } },
        { returnDocument: 'after' }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getBoard = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          //Match a board
          $match: {
            _id: ObjectId(id),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, //collection name
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, //collection name
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray();
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = { createNew, getBoard, pushColumnOrder };
