/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and account access APIs
 *   - name: Profile
 *     description: Authenticated user profile APIs
 *   - name: Notifications
 *     description: Notification APIs
 *   - name: Admin Users
 *     description: Admin user management APIs
 *
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           type: object
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "9876543210"
 *         profilePic:
 *           type: string
 *           example: https://example.com/profile.jpg
 *         role:
 *           type: string
 *           enum: [user, superAdmin, admin]
 *           example: user
 *         isEmailVerified:
 *           type: boolean
 *           example: true
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *         to:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *         from:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012346
 *         title:
 *           type: string
 *           example: New message
 *         content:
 *           type: string
 *           example: You received a message
 *         isRead:
 *           type: boolean
 *           example: false
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 3
 *         totalResults:
 *           type: integer
 *           example: 25
 */
