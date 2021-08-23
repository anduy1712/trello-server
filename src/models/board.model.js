import Joi from 'joi';
import { getDB } from '../configs/mongodb.js';
//Define Board Collection
const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
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
    console.log(error);
  }
};

export const BoardModel = { createNew };