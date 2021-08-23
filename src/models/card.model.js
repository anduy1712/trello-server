import Joi from 'joi';
import { getDB } from '../configs/mongodb.js';
//Define Card Collection
const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  ColumnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
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
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value);
    const resultFinal = await getDB()
      .collection(cardCollectionName)
      .findOne(result.insertedId);
    return resultFinal;
  } catch (error) {
    console.log(error);
  }
};

export const CardModel = { createNew };
