import httpStatus from 'http-status';
import { User, Token } from './../../../modals/index.js';
import catchAsync from '../../../utils/catchAsyunc.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { otpServices, userServices, tokenServices } from '../../../services/index.js';
export const register = catchAsync(async (req, res) => {
  const { email } = req.body;
  const isTaken = await User.isEmailTaken(email);

  if (isTaken) {
    sendResponse(res, httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(req.body);
  const tokens = await generateAuthTokens(user);
  const otp = otpServices.generateOTP();
  user.otp = otp;
  await user.save();

  await emailService.sendVerificationEmail(user.email, user.otp);
});
