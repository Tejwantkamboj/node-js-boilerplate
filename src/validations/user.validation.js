import Joi from 'joi';

export const editProfile = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
  }),
};
