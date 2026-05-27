import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import {
  changePassword,
  forgotPassword,
  reSendVerificationOtp,
  login,
  authMe,
  register,
  resetPasssword,
  verifyForgotPasswordOtp,
  verifyRegisterOtp,
} from '../../controllers/authController/index.js';
import { authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.post('/register', validate(authValidation.register), register);
router.post('/verify-register-otp', validate(authValidation.verifyRegisterOtp), verifyRegisterOtp);
router.post('/resend-otp', validate(authValidation.forgotPassword), reSendVerificationOtp);
router.post('/login', validate(authValidation.login), login);
router.post('/change-password', authMiddleware, validate(authValidation.changePassword), changePassword);
router.get('/me', authMiddleware, authMe);
router.post('/forgot-password', validate(authValidation.forgotPassword), forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), resetPasssword);
router.post('/verify-forgot-password-otp', validate(authValidation.verifyForgotPasswordOtp), verifyForgotPasswordOtp);

export default router;
