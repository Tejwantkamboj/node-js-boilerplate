import crypto from 'crypto';
import { ApiError } from '../utils/index.js';
import { User } from '../modals/index.js';
import httpStatus from 'http-status';

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
  const user = await User.findById(id).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const meApiData = async (id) => {
  User.aggregate([
    {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(id) },
        ...(search && {
          $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }],
        }),
      },
    },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: 'orders',
              localField: '_id',
              foreignField: 'userId',
              as: 'orderSummary',
            },
          },
          {
            $addFields: {
              ordersCount: { $size: '$orderSummary' },
            },
          },
          {
            $project: {
              name: 1,
              email: 1,
              firstName: 1,
              lastName: 1,
              avatar: 1,
              createdAt: 1,
              ordersCount: 1,
            },
          },
        ],
        totalResults: [{ $count: 'count' }],
      },
    },
  ]);
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  await Salary.find().sort({ salary: 1 }).skip(1);
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
  meApiData,
};
