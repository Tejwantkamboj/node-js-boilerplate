import { User, Token } from '../../modals/index.js';
import { sendResponse, catchAsync } from '../../utils/index.js';
import httpStatus from 'http-status';
import { tokenService, userService } from '../../services/index.js';

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  user.otp = userService.generateOtp();
  await user.save();
  sendResponse(res, httpStatus.CREATED, 'Registred Successfully', user);
});

const verifyRegisterOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const user = await userService.getUserByEmail(email);

  if (user.otp !== otp) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'Invalid OTP');
  }
  user.otp = null;
  user.isEmailVerified = true;
  await user.save();
  sendResponse(res, httpStatus.OK, 'OTP verified successfully');
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'Incorrect password');
  }
  const token = await tokenService.generateAuthTokens(user);
  sendResponse(res, httpStatus.OK, 'Logged in Successfully', { user: user, token });
});

const changePassword = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  const user = await userService.getUserById(id);
  const isPasswordMatch = await user.isPasswordMatch(oldPassword);
  if (!isPasswordMatch) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'Incorrect old password');
  }
  user.password = newPassword;
  await user.save();
  sendResponse(res, httpStatus.OK, 'Password changed successfully');
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);
  const otp = userService.generateOtp();
  user.otp = otp;
  await user.save();
  sendResponse(res, httpStatus.OK, 'Forgot password OTP sent to email', { otp: otp });
});

const resetPasssword = catchAsync(async (req, res) => {
  const { email, token, password } = req.body;
  const user = await userService.getUserByEmail(email);
  const isTokwenExists = await Token.findOne({ token, type: 'resetPassword', user: user._id });

  if (!isTokwenExists) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'Invalid or expired reset password token');
  }

  const isPasswordResetTokenValid = await tokenService.verifyToken(token, 'resetPassword');
  if (!isPasswordResetTokenValid) {
    await Token.findByIdAndDelete(isTokwenExists._id);
    sendResponse(res, httpStatus.BAD_REQUEST, 'Invalid or expired reset password token');
  }

  user.password = password;
  await user.save();
  sendResponse(res, httpStatus.OK, 'Password reset successfully');
});

const verifyForgotPasswordOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const user = await userService.getUserByEmail(email);

  if (user.otp !== otp) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'Invalid OTP');
  }
  user.otp = null;
  await user.save();
  const token = await tokenService.generateToken(user, 'resetPassword');
  sendResponse(res, httpStatus.OK, 'OTP verified successfully', { user: user, token });
});

export { register, login, resetPasssword, changePassword, verifyRegisterOtp, forgotPassword, verifyForgotPasswordOtp };
