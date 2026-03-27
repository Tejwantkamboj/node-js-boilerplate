import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import { updateProfile, getProfile, deleteProfile } from '../../controllers/userController/profile.controller.js';

const router = express.Router();
router.use(authMiddleware);
router.route('/').get(getProfile).put(updateProfile).delete(deleteProfile);

export default router;
