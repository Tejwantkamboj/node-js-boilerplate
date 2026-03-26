import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import { ApiError } from '../utils/index.js';
import { User, Token } from '../modals/index.js';
import config from '../config/config.js';

const generateToken = async (user, type) => {
  let expires;

  if (type === 'access') {
    expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  } else if (type === 'refresh') {
    expires = moment().add(config.jwt.refreshExpirationDays, 'days');
  } else if (type === 'resetPassword') {
    expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  } else if (type === 'verifyEmail') {
    expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  } else {
    expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  }

  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.secret);
  const date = expires.toDate();
  return { token, date, type };
};

const saveToken = async (data, userId, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token: data.token,
    user: userId,
    expires: data.date,
    type: data.type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessToken = generateToken(user, 'access');
  const refreshToken = generateToken(user, 'refresh');

  await saveToken(accessToken, user._id);
  await saveToken(refreshToken, user._id);

  return {
    access: {
      token: accessToken.token,
      expires: accessToken.date,
    },
    refresh: {
      token: refreshToken.token,
      expires: refreshToken.date,
    },
  };
};

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const resetPasswordToken = generateToken(user, 'resetPassword');
  await saveToken(resetPasswordToken, user.id);
  return resetPasswordToken.token;
};

const generateVerifyEmailToken = async (user) => {
  const verifyEmailToken = generateToken(user, 'VERIFY_EMAIL');
  await saveToken(verifyEmailToken, user.id);
  return verifyEmailToken.token;
};

const generateOtp = (user) => {};

export default {
  generateToken,
  saveToken,
  generateAuthTokens,
  verifyToken,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  generateOtp,
};
