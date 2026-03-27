import { User } from '../../modals/index.js';
import { catchAsync, sendResponse } from '../../utils/index.js';
import { userService } from '../../services/index.js';
import httpstatus from 'http-status';

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  sendResponse(res, httpstatus.OK, 'User profile fetched successfully', user);
});

const updateProfile = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { ...req.body } },
    { new: true, runValidators: true },
  )
    .select('-password')
    .lean();
  sendResponse(res, httpstatus.OK, 'User profile updated successfully', updatedUser);
});

const deleteProfile = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  sendResponse(res, httpstatus.NO_CONTENT, 'User profile deleted successfully');
});

export { getProfile, updateProfile, deleteProfile };
