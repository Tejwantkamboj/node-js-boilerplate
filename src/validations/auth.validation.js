import Joi from 'joi';
import { password } from './custom.validations.js';

export const register = {
  body: Joi.object.keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
