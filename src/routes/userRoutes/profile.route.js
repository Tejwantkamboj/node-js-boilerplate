import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { updateProfile, getProfile, deleteProfile } from '../../controllers/userController/profile.controller.js';

const router = express.Router();
router.use(authMiddleware);

router.route('/').get(getProfile).put(updateProfile).delete(deleteProfile);

export default router;

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               avatar:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *     responses:
 *       200:
 *         User profile updated successfully
 */

/**
 * @swagger
 * /user/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User profile deleted successfully
 */
