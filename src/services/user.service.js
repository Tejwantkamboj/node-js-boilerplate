import crypto from 'crypto';
import ApiError from '../utils/ApiError';
import { User, Token } from '../modals';

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
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
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
