import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import { commonValidation } from '../../validations/index.js';
import {
  createNotification,
  notificationList,
  readAllNotifications,
  markSelectedNotificationsAsRead,
} from '../../controllers/commonController/notification.controller.js';
import authMiddleware from '../../middlewares/auth.js';
const router = Router();
router.use(authMiddleware);

router.route('/').post(createNotification).get(validate(commonValidation.listWithPagination), notificationList);
router.route('/mark-as-read').put(readAllNotifications);
router
  .route('/mark-as-read-selected')
  .put(validate(commonValidation.objectIdArrayValidation), markSelectedNotificationsAsRead);
export default router;


/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Get notification list
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Notification list retrieved successfully
 */
