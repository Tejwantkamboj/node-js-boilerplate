import { User, Token } from '../../modals/index.js';
import { sendResponse, catchAsync } from '../../utils/index.js';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // const token = await tokenService.generateAuthToken(user);
  sendResponse(res, httpStatus.CREATED, 'Registred Successfully', user);
});

const login = catchAsync(async (req, res) => {
  const { email, password, role } = req.body;
  const user = User.findOne({ email: email, role: role });
  if (!user) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'User not found');
  }
});

export { register, login };
