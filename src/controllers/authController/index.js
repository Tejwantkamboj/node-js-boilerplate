import { User, Token } from '../../modals/index.js';
import sendResponse from '../../utils/sendResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import httpStatus from 'http-status';


const register = catchAsync(async (req, res) => {
  
});

const login = catchAsync(async (req, res) => {
  const { email, password, role } = req.body;
  const user = User.findOne({ email: email, role: role });
  if (!user) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'User not found');
  }
});

export { register, login };
