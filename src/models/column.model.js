import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/mongodb.js';
//Define Column Collection
const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false
  });
};

const createNew = async (data) => {
  try {
    const validate = await validateSchema(data);
    const insertValue = {
      ...validate,
      boardId: ObjectId(validate.boardId)
    };
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);
    const resultFinal = await getDB()
      .collection(columnCollectionName)
      .findOne(result.insertedId);
    return resultFinal;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} columnId
 * @param {string} newCardId
 */
const pushCardOrder = async (columnId, newCardId) => {
  try {
    const result = getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: newCardId } },
        { returnDocument: 'after' }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const dataUpdate = {
      ...data,
      boardId: ObjectId(data.boardId)
    };
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: dataUpdate },
        { returnDocument: 'after' }
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  pushCardOrder
};
