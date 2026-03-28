import Joi from 'joi';
import { objectId } from './custom.validation.js';

export const objectIdArrayValidation = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(objectId)).required().min(1),
  }),
};

export const paramIdValidation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const listWithPagination = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().allow('').default(''),
    sort: Joi.string().valid('asc', 'desc').allow('').default('asc'),
  }),
};
