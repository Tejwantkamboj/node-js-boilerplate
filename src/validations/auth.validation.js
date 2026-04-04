import Joi from 'joi';
import { objectId, password } from './custom.validation.js';

export const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

export const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    token: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

export const verifyRegisterOtp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    otp: Joi.number().required(),
  }),
};

export const verifyForgotPasswordOtp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    otp: Joi.number().required(),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    role: Joi.string().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};
