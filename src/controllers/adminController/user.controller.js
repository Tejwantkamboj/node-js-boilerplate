import { User } from '../../modals/index.js';
import { sendResponse, catchAsync, ApiError } from '../../utils/index.js';
import httpStatus from 'http-status';
import { userService } from '../../services/index.js';

export const userList = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { page = 1, limit = 10, search = '' } = req.query;
  const query = { _id: { $ne: id } };
  const options = { page, limit };

  if (search) {
    query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }

  const results = await User.paginate(query, options);
  sendResponse(res, httpStatus.OK, 'User List', results);
});

export const addUser = catchAsync(async (req, res) => {
  let user = await userService.getUserByEmail(req.body.email);

  if (user) {
    sendResponse(res, httpStatus.CONFLICT, 'User with this email already exists');
  }
  user = await User.create(req.body);
  sendResponse(res, httpStatus.CREATED, 'User created successfully', user);
});

export const editUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  sendResponse(res, httpStatus.OK, 'User Updated', user);
});

export const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  sendResponse(res, httpStatus.OK, 'User Deleted');
});

export const getUserDetailsById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  sendResponse(res, httpStatus.OK, 'User Details', user);
});
