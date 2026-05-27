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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: message
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *     responses:
 *       200:
 *         description: Notification list retrieved successfully
 *   post:
 *     summary: Create notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, to]
 *             properties:
 *               title:
 *                 type: string
 *                 example: New message
 *               content:
 *                 type: string
 *                 example: You received a message
 *               to:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f789012345
 *               from:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f789012346
 *     responses:
 *       201:
 *         description: Notification created successfully
 *
 * /notification/mark-as-read:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *
 * /notification/mark-as-read-selected:
 *   put:
 *     summary: Mark selected notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [notificationIds]
 *             properties:
 *               notificationIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f1a2b3c4d5e6f789012345"]
 *     responses:
 *       200:
 *         description: Selected notifications marked as read
 */
