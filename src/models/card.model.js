import Joi from 'joi';
import { getDB } from '../configs/mongodb.js';
import { ObjectId } from 'mongodb';

//Define Card Collection
const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false
  });
};

const createNew = async (data) => {
  try {
    const validate = await validateSchema(data);
    const insertValue = {
      ...validate,
      boardId: ObjectId(validate.boardId),
      columnId: ObjectId(validate.columnId)
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);
    const resultFinal = await getDB()
      .collection(cardCollectionName)
      .findOne(result.insertedId);
    return resultFinal;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const dataUpdate = {
      ...data
    };
    if (data.boardId) dataUpdate.boardId = ObjectId(data.boardId);
    if (data.columnId) dataUpdate.columnId = ObjectId(data.columnId);
    const result = await getDB()
      .collection(cardCollectionName)
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

/**
 *
 * @param {Array of string id cards} ids
 */

const deleteMany = async (ids) => {
  try {
    const transformId = ids.map((i) => ObjectId(i));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany({ _id: { $in: transformId } }, { $set: { _destroy: true } });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = { cardCollectionName, createNew, deleteMany, update };
