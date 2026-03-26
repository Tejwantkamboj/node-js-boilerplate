import crypto from 'crypto';
import { ApiError } from '../utils/index.js';
import { User, Token } from '../modals/index.js';

const createUser = async (userBody) => {
  return User.create(userBody);
};

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const getUserByEmail = async (email) => {
  const user = User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(user, updateBody);
  if (user.isNewPassword) {
    user.isNewPassword = false;
  }
  await user.save();
  return user;
};

export default {
  createUser,
  generateOtp,
  getUserById,
  getUserByEmail,
  queryUsers,
  updateUserById,
};
