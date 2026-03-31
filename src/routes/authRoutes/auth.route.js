import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import {
  changePassword,
  forgotPassword,
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
router.post('/login', validate(authValidation.login), login);
router.post('/change-password', authMiddleware, validate(authValidation.changePassword), changePassword);
router.get('/me', authMiddleware, authMe);
router.post('/forgot-password', validate(authValidation.forgotPassword), forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), resetPasssword);
router.post('/verify-forgot-password-otp', validate(authValidation.verifyForgotPasswordOtp), verifyForgotPasswordOtp);

export default router;

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: User details
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: Registred Successfully
 */

/**
 * @swagger
 * /auth/verify-register-otp:
 *   post:
 *     summary: verify-register-otp
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               otp:
 *                 type: number
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@yopmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Logged in Successfully
 */

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: change password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: OldPassword@123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword@123
 *               otp:
 *                 type: number
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Password changed successfully
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Forgot password OTP sent to email
 */

/**
 * @swagger
 * /auth/verify-forgot-password-otp:
 *   post:
 *     summary: verify forgot password OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               otp:
 *                 type: number
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: NewPassword@123
 *               token:
 *                 type: string
 *                 example: jwt-token
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
